import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Sector, Startup } from 'projects/libs/src/model';

@Component({
    selector: 'app-startup-card',
    templateUrl: './startup-card.component.html',
    styleUrls: ['./startup-card.component.scss']
})
export class StartupCardComponent implements OnInit {
    sectors: Sector[] ;
    @Input() startup: Startup;
    
    focus;
    constructor(private router: Router,private fbs: FirebaseService) {
    }

    ngOnInit() {
     this.fbs.getSectors().then(x => {
     this.sectors = x as any;
     })
    
    }

    open() {
        this.router.navigate(['/profile/' + this.startup.id])
    }
}
