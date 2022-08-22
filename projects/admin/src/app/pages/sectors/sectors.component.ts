import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { Startup,Sector } from '../../model';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.less']
})
export class SectorsComponent implements OnInit {
  data :Sector[]=[]
  constructor(private firebaseService : FirebaseService,
    private router:Router) { }

  ngOnInit(): void {
    this.firebaseService.sectors.subscribe(res =>{
      this.data = res as any;
      console.log(this.data)
    })
  }
  goToAdd() {
    this.router.navigate(['/sectors/add']);
  }

}
