import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FirebaseService } from '../../../../../libs/src/firebase.service';


@Component({
  selector: 'app-sector-profile',
  templateUrl: './sector-profile.component.html',
  styleUrls: ['./sector-profile.component.less']
})
export class SectorProfileComponent implements OnInit {
  id!: string | null;
  profile!: any;
  isEditEnabled: boolean = false;
  isAdd: boolean = false;
  
  public get title() : string {
    return  this.profile?.sectorName ? this.profile.category : "Add new Sector";
  }
  public get editBtnlabel() : string {
    return  this.isEditEnabled ? 'Cancel' : "Edit";
  }

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router,
    private notification: NzNotificationService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.firebaseService.getSector(this.id!).then((res) => {
        this.profile = res as any;
      });
     
    }else{
      this.isAdd=true;
    }  
  }
  onBack() {
    this.router.navigate(['/sectors']);
  }




  delete() {
    this.firebaseService.deleteSector(this.id!).then(() => {
      this.onBack();
      this.notification.success(
        'Sector Deleted Successfully',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      );
    });
  }



  confirm(): void {
    this.delete()
  }

  enableEdit() {
    return (this.isEditEnabled = !this.isEditEnabled);
  }
}



