import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Startup } from '../model';


@Component({
  selector: 'app-startups-list',
  templateUrl: './startups-list.component.html',
  styleUrls: ['./startups-list.component.less']
})
export class StartupsListComponent implements OnInit {
  
  data:Startup[]=[];

  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.firebaseService.startups.subscribe(res => {
      this.data = res as any;
      console.log(this.data)
    })
  }

  goToAdd() {
    this.router.navigate(['/companies/add']);
  }
}
