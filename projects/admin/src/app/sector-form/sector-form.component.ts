import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { FirebaseService } from '../../../../libs/src/firebase.service';
import { Sector,Categorys } from '../../../../libs/src/model';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.less'],
})
export class SectorFormComponent implements OnInit {
  downloadURL! :Observable<string>;
  urlBack : any;
  @Input() sector?: Sector;
  @Input() id?: string | null;
  @Input()
  public set isEditEnabled(v: boolean) {
    console.log(v);
    this._isEditEnabled = v;
    if (v) {
      this.sectorForm?.enable();
    } else {
      this.sectorForm?.disable();
    }
  }

  public get isEditEnabled() {
    return this._isEditEnabled;
  }

  
  public categorysList = Object.keys(Categorys).filter(v => isNaN(Number(v)));

  
  private _isEditEnabled!: boolean;

  @Input() isAdd!: boolean;
  sectorForm!: FormGroup;
  public get btnLabel(): string {
    return this.isAdd ? 'Add' : 'Update';
  }
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.sectorForm = this.fb.group({
      sectorName: [null, [Validators.required]],
      category: [null, [Validators.required]],
      sectorLogo: [null, [Validators.required]],
      designColor: [null, [Validators.required]],

    });

    if (this.isAdd) {
    } else {
      this.sectorForm.patchValue(this.sector!);
      this.sectorForm.disable();
    }
  }

  submitForm(): void {
    if (this.isAdd) {
      this.add();
    } else if (this.isEditEnabled) {
      console.log('page id is', this.id);
      this.update();
    }
  }

  add(): void {
    if (this.sectorForm.valid) {
      this.firebaseService.addSector(this.sectorForm.value).then(() => {
        this.router.navigate(['/home/sectors']);
      });
    } else {
      Object.values(this.sectorForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  update(): void {
    if (this.sectorForm.valid) {
      this.firebaseService
        .updateSector(this.id!, this.sectorForm.value)
        .then(() => {
          this.router.navigate(['/home/sectors']);
        });
    } else {
      Object.values(this.sectorForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onFileSelected(event:any) {
    let n = Date.now() + ".jpg";
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.urlBack = url;
              this.sectorForm.patchValue({sectorLogo:url})
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  getImage(){
    return this.sectorForm.get('sectorLogo').value
  }

}
