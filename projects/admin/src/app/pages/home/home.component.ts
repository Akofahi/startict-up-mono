import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../../libs/src/firebase.service';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'projects/libs/src/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  title = 'cloudsSorage';
  selectedFile: File = null as any;
  fb: any;
  downloadURL!: Observable<string>;
  guard!: boolean;
  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {}

  isCollapsed = false;

  Signout(){
  this.auth.SignOut();
  }  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.firebaseService.requests.subscribe((res) => {
      // console.log('requests', res);
    });
    this.firebaseService.startups.subscribe((res) => {
      // console.log('startups', res);
    });

    this.firebaseService.sectors.subscribe((res) => {
      //  console.log('sectors', res);
    });

    //   this.firebaseService.addStartup(startup)
  }
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
              this.fb = url;
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
