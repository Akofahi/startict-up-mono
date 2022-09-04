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
import { /*Observable,*/ Observer } from 'rxjs'; 
/* nzUpload: Custom Upload request */
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-startup-submit-form',
  templateUrl: './startup-submit-form.component.html',
  styleUrls: ['./startup-submit-form.component.less'],
})
export class StartupSubmitFormComponent implements OnInit {
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
//   customUploadReq = (item: NzUploadXHRArgs) => {
//     const formData = new FormData();
//     formData.append('file', item.file as any); // tslint:disable-next-line:no-any
//     ///formData.append('id', '1000');
//     const req = new HttpRequest('POST', item.action!, formData, {
//       reportProgress : true,
//       withCredentials: false
//     });
//     // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
//    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
//       if (event.type === HttpEventType.UploadProgress) {
//         if (event.total! > 0) {
//           (event as any).percent = event.loaded / event.total! * 100; // tslint:disable-next-line:no-any
//         }
//         // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
//         item.onProgress!(event, item.file);
//       } else if (event instanceof HttpResponse) { /* success */
//         item.onSuccess!(event.body, item.file, event);
//       }
//     },(err: any) => { /* error */
//       item.onError!(err, item.file);
//     });
// }
}
