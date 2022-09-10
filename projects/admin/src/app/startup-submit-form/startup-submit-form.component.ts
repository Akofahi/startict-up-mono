import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../libs/src/firebase.service';
import { Startup } from '../../../../libs/src/model';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
/* nzUpload: Upload */
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
/* nzUpload: Custom pre-upload checks */
import { /*Observable,*/ finalize, Observable, Observer } from 'rxjs'; 
/* nzUpload: Custom Upload request */
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-startup-submit-form',
  templateUrl: './startup-submit-form.component.html',
  styleUrls: ['./startup-submit-form.component.less'],
})
export class StartupSubmitFormComponent implements OnInit {
  urlBack: string;
  downloadURL!:Observable<string>;  
  @Input() startup?: Startup;
  @Input() id?:string | null ;
  http: any;
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
  private basePath = "/uploads"

  @Input() isAdd!: boolean;
  startupForm!: FormGroup;
  public get btnLabel(): string {
    return this.isAdd ? 'Add' : 'Update';
  }
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private msg: NzMessageService,
    private storage: AngularFireStorage
   
    
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
        this.router.navigate(['/home/companies']);
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
        this.router.navigate(['/home/companies']);
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

  // handleChange(info: NzUploadChangeParam): void {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     this.msg.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     this.msg.error(`${info.file.name} file upload failed.`);
  //   }
  // }

  setMediaUploadHeaders = (file: NzUploadFile) => {
    return {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    }
  };

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
              this.startupForm.patchValue({logoImg:url})
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

  
}
