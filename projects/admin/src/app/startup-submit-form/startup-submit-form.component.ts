import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Startup } from '../model';

@Component({
  selector: 'app-startup-submit-form',
  templateUrl: './startup-submit-form.component.html',
  styleUrls: ['./startup-submit-form.component.less'],
})
export class StartupSubmitFormComponent implements OnInit {
  @Input() startup?: Startup;
  
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
      companyName: [null, [Validators.required]],
      ceo: [null, [Validators.required]],
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

  update(): void {}
}
