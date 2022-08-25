import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../../../../libs/src/firebase.service';
import { Categorys, Sector } from 'projects/libs/src/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-profile',
  templateUrl: './request-profile.component.html',
  styleUrls: ['./request-profile.component.less'],
})
export class RequestProfileComponent implements OnInit {
  sectorsData!: Sector[];
  requestForm!: FormGroup;
  categorySelected: any;
  filteredSectors: Sector[] = [];
  categorysList = Object.keys(Categorys).filter((v) => isNaN(Number(v)));
  
  id!: string | null;
  profile!: any;
  isEditEnabled: boolean = false;
  isAdd: boolean = false;

  public get title(): string {
    return this.profile?.ceo ? this.profile.ceo : 'Add new Request';
  }

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.firebaseService.getSectors().then((res) => {
      console.log(res);
    });
    console.log('categorysList', this.categorysList);

    this.firebaseService.sectors.subscribe((res) => {
      this.sectorsData = res as any;
    });
    this.requestForm = this.fb.group({
      startupName: [null, [Validators.required]],
      logoImg: [null, [Validators.required]],
      images: [null, [Validators.required]],
      designColor: [null, [Validators.required]],
      city: [null, [Validators.required]],
      founderName: [null, [Validators.required]],
      numberOfEmployees: [null, [Validators.required]],
      yearOfEstablishment: [null, [Validators.required]],
      websiteURL: [null, [Validators.required]],
      email: [null, [Validators.required]],
      categorys: [null, [Validators.required]],
      sectors: [null, [Validators.required]],
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.firebaseService.getRequests(this.id!).then((res: any) => {
        this.profile = res as any;
        console.log(res);
        const sectors = this.profile.sectors.map((v: any) => v.id);       
        console.log('sectors', sectors);
        this.requestForm.patchValue({
          ...this.profile!,
          sectors,
        });

        setTimeout(() => {
          this.updateSectorsCat();
        }, 500);
        if(this.profile.status=='approved' || this.profile.status=='rejected'){
          this.requestForm.disable();
        }
      });
    }
  }
  

  add(): void {
    if (this.requestForm.valid) {
      this.firebaseService.addRequest(this.requestForm.value).then(() => {});
    } else {
      Object.values(this.requestForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  updateSectorsCat() {
    const category = this.requestForm.get('categorys')?.value;
    this.filteredSectors = this.sectorsData?.filter(
      (v) => v.category == category
    );
  }
  onBack() {
    this.router.navigate(['/requests']);
  }

  reject() {
    return this.firebaseService.updateRequest(this.id!,{status:'rejected'}).then(() => {
      this.onBack();
      this.notification.success(
        'Startup Deleted Successfully',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      );
    });
  }

  approve() {
    return this.firebaseService.updateRequest(this.id!,{status:'approved'}).then(() => {
      this.onBack();
      this.notification.success(
        'Startup Approved Successfully',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      );
    });
  }
}
