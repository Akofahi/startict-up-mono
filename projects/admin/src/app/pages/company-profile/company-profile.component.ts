import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { Startup } from '../../model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.less']
})
export class CompanyProfileComponent implements OnInit {
  id!:string  | null;
  profile !: Startup;

  constructor(private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router) { }
    
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.firebaseService.getStartup(this.id!).then(res=>{
      this.profile = res as any;
    });
  }
  onBack(){
    this.router.navigate(['/companies'])
  }

}
