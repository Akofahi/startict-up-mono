import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { FirebaseService } from '../../../../../libs/src/firebase.service';
import { Startup,Sector } from '../../../../../libs/src/model';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.less']
})
export class SectorsComponent implements OnInit {
  data :Sector[]=[]
  searchData:Sector[]=[]
  constructor(private firebaseService : FirebaseService,
    private router:Router) { }

  ngOnInit(): void {
    this.firebaseService.sectors.subscribe(res =>{
      this.data = res as any;
      this.searchData = this.data
      console.log(this.data)
    })
  }
  goToAdd() {
    this.router.navigate(['/home/sectors/add']);
  }

  search(searchValue:any){
    //   console.log("Search = click");
    // console.log(searchValue);
      const fuse = new Fuse(this.data,{includeScore: true,keys:['sectorName']})
      if(searchValue?.trim().length){
        this.searchData = fuse.search(searchValue).map((x:any)=> x.item)}else{
          this.searchData= this.data
        }
      }
}
