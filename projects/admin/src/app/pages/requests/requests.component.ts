import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Requests, Startup } from 'projects/libs/src/model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less']
})
export class RequestsComponent implements OnInit {
  
  data:Requests[]=[];
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
        console.log(this.data)
      })
     
    }
  }
}