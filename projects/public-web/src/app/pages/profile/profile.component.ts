import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Startup } from 'projects/libs/src/model';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  URL:any;

  id = this.route.snapshot.paramMap.get('id');
  startup: Startup;
  constructor(private route: ActivatedRoute, private firebase: FirebaseService) {
    this.firebase.getStartup(this.id).then(
      res => {
        this.startup = res as Startup;
        console.log('startup', this.startup);
        
      }
    )
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    this.URL= window.location.href
    console.log('URL',this.URL);
    
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
