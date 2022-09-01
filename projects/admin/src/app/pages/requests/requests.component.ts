import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  Fuse from 'fuse.js';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Requests, Startup } from 'projects/libs/src/model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less']
})
export class RequestsComponent implements OnInit {
  
  data:Requests[]=[];
  searchData:Requests[]=[];
  status:any;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute

  ) { this.router.routeReuseStrategy.shouldReuseRoute = () => false   }
  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status');
    if (this.status) {
      this.firebaseService.requests.subscribe(res => {
        this.data = res.filter((v:any)=>v.status==this.status) as any
        this.searchData=this.data
        console.log(this.data)
      })
     
    }
  }

  search(searchValue:string){
    //   console.log("Search = click");
    // console.log(searchValue);
      const fuse = new Fuse(this.data,{includeScore: true,keys:['startupName']})
      if(searchValue?.trim().length){
      this.searchData = fuse.search(searchValue).map((x:any)=> x.item)}else{
        this.searchData= this.data
      }
    }
}