import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import * as Rellax from 'rellax';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private fire: FirebaseService, private router: Router, private storage: AngularFireStorage) {
    this.form = fb.group({
      startupName: ['', [Validators.required]],
      description: ['', []],
      founderName: ['', [Validators.required]],
      numberOfEmployees: ['', [Validators.required]],
      yearOfEstablishment: ['', [Validators.required]],
      websiteURL: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designColor: ['', [Validators.required]],
      city: ['', [Validators.required]],
      sectors: [[], [Validators.required]],
      images: [[]],
      logoImg: [''],
    })
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

  }
  ngOnDestroy() {

  }

  submit() {
    if (!this.form.valid) {
      // todo notify user for invalid fields
      console.log(this.form.errors);
      
      // return;
    }
    this.fire.addRequest(this.form.value).then(() => {
      this.router.navigate(['/index'])
    })
  }

  onFileSelected(event: any, type: 'logo' | 'image') {
    let n = Date.now() + ".jpg";
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            if (url) {

              if(type == 'image') {
                this.form.patchValue({ images: [url] })
              }
              if(type == 'logo') {
                this.form.patchValue({ logoImg: url })
              }
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
