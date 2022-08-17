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
  loading = false;
  
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


  // data = [
  //   {
  //     title: 'Ant Design Title 1'
  //   },
  //   {
  //     title: 'Ant Design Title 2'
  //   },
  //   {
  //     title: 'Ant Design Title 3'
  //   },
  //   {
  //     title: 'Ant Design Title 4'
  //   }
  // ];

  // change(): void {
  //   this.loading = true;
  //   if (Object.keys(this.data).length > 0) {
  //     setTimeout(() => {
  //       this.loading = false;
  //       this.data = this.firebaseService.getStartups() ;
  //     }, 1000);
  //   } else {
  //     setTimeout(() => {
  //       this.loading = false;
  //     }, 1000);
  //   }
  // }
}
