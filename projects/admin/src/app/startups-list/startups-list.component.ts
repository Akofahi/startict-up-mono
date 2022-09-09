import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { FirebaseService } from '../../../../libs/src/firebase.service';
import { Startup } from '../../../../libs/src/model';


@Component({
  selector: 'app-startups-list',
  templateUrl: './startups-list.component.html',
  styleUrls: ['./startups-list.component.less']
})
export class StartupsListComponent implements OnInit {
  
  data:Startup[]=[];
  searchData:Startup[]=[];
 
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.firebaseService.startups.subscribe(res => {
      this.data = res as any;
      this.searchData = this.data
     
      console.log(this.data)
      
    })
  } 
   

  search(searchValue:any){
  //   console.log("Search = click");
  // console.log(searchValue);
    const fuse = new Fuse(this.data,{includeScore: true,keys:['startupName']})
    if(searchValue?.trim().length){
      this.searchData = fuse.search(searchValue).map((x:any)=> x.item)}else{
        this.searchData= this.data
      }
    }

  goToAdd() {
    this.router.navigate(['/home/companies/add']);
  }
}
