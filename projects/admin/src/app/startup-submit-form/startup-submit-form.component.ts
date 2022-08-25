import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../libs/src/firebase.service';
import { Startup } from '../../../../libs/src/model';

@Component({
  selector: 'app-startup-submit-form',
  templateUrl: './startup-submit-form.component.html',
  styleUrls: ['./startup-submit-form.component.less'],
})
export class StartupSubmitFormComponent implements OnInit {
  @Input() startup?: Startup;
  @Input() id?:string | null ;
  @Input() 
  public set isEditEnabled(v : boolean) {
    console.log(v);
    this._isEditEnabled = v;
    if(v){
      this.startupForm?.enable();
      
    }else{
      this.startupForm?.disable();
    }
  }
  
  
  public get isEditEnabled() {
    return this._isEditEnabled
  }
  
  private _isEditEnabled!: boolean;

  @Input() isAdd!: boolean;
  startupForm!: FormGroup;
  public get btnLabel(): string {
    return this.isAdd ? 'Add' : 'Update';
  }
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startupForm = this.fb.group({
      startupName: [null, [Validators.required]],
      logoImg: [null, [Validators.required]],
      images : [null,[Validators.required]],
      designColor : [null,[Validators.required]],
      city : [null,[Validators.required]],
      founderName : [null,[Validators.required]],
      numberOfEmployees : [null,[Validators.required]],
      yearOfEstablishment : [null,[Validators.required]],
      websiteURL : [null,[Validators.required]],
      email : [null,[Validators.required]],
      sectors : [null,[Validators.required]],
    });

    if (this.isAdd) {
    } else {
      this.startupForm.patchValue(this.startup!);
      this.startupForm.disable();
    }
  }

  submitForm(): void {
    if (this.isAdd) {
      this.add();
    } else if (this.isEditEnabled) {
      console.log("page id is",this.id)
      this.update();
    }
  }

  add(): void {
    if (this.startupForm.valid) {
      this.firebaseService.addStartup(this.startupForm.value).then(() => {
        this.router.navigate(['/companies']);
      });
    } else {
      Object.values(this.startupForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  update(): void {
    if (this.startupForm.valid) {
      this.firebaseService.updateStartup(this.id!,this.startupForm.value).then(() => {
        this.router.navigate(['/companies']);
      });
    } else {
      Object.values(this.startupForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
