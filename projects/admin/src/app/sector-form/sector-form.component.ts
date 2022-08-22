import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Sector,Categorys } from '../model';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.less'],
})
export class SectorFormComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sectorForm = this.fb.group({
      sectorName: [null, [Validators.required]],
      category: [null, [Validators.required]],
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
        this.router.navigate(['/sectors']);
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
          this.router.navigate(['/sectors']);
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
}
