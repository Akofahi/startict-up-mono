import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Startup } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {

  }

  isCollapsed = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.firebaseService.requests.subscribe(res => {
      // console.log('requests', res);
      
    })
    this.firebaseService.startups.subscribe(res => {
      // console.log('startups', res);
    })

    this.firebaseService.sectors.subscribe(res =>{
         console.log('sectors', res);
    })

  //   this.firebaseService.addStartup(startup)
  }


}
