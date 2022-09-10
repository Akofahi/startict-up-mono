import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Startup } from 'projects/libs/src/model';

@Component({
    selector: 'app-startup-card',
    templateUrl: './startup-card.component.html',
    styleUrls: ['./startup-card.component.scss']
})
export class StartupCardComponent implements OnInit {

    @Input() startup: Startup;
    
    focus;
    constructor(private router: Router) {
    }

    ngOnInit() {
    
    }

    open() {
        this.router.navigate(['/profile/' + this.startup.id])
    }
}
