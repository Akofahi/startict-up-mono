import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-startup-submit-form',
  templateUrl: './startup-submit-form.component.html',
  styleUrls: ['./startup-submit-form.component.less']
})
export class StartupSubmitFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
    ) {}

  addStartupForm!: FormGroup;

  submitForm(): void {
    if (this.addStartupForm.valid) {
      this.firebaseService.addStartup(this.addStartupForm.value)
    } else {
      Object.values(this.addStartupForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }



  ngOnInit(): void {
    this.addStartupForm = this.fb.group({
      name: [null, [Validators.required]],
      ceo: [null, [Validators.required]]
    });
  }
  
}
