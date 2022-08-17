import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.less'],
})
export class CompanyProfileComponent implements OnInit {
  id!: string | null;
  profile!: any;
  isEditEnabled: boolean = false;
  isAdd: boolean = false;
 
  
  public get title() : string {
    return  this.profile?.ceo ? this.profile.ceo : "Add new StartUP";
  }
  public get editBtnlabel() : string {
    return  this.isEditEnabled ? 'Cancel' : "Edit";
  }
  

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.firebaseService.getStartup(this.id!).then((res) => {
        this.profile = res as any;
      });
     
    }else{
      this.isAdd=true;
    }
     
  }

  onBack() {
    this.router.navigate(['/companies']);
  }

  delete() {
    this.firebaseService.deleteStartup(this.id!).then(() => {
      this.onBack();
      this.notification.success(
        'Startup Deleted Successfully',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      );
    });
  }

  enableEdit() {
    return (this.isEditEnabled = !this.isEditEnabled);
  }
}
