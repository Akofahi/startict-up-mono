import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Startup } from 'projects/libs/src/model';

@Component({
    selector: 'app-startups-list',
    templateUrl: './startups-list.component.html',
    styleUrls: ['./startups-list.component.scss']
})
export class StartupsListComponent implements OnInit {
    focus;
    constructor(private firebase: FirebaseService) {
    }

    startups: Startup[] = []

    ngOnInit() {
        this.firebase.startups.subscribe((startups: Startup[]) => {
            this.startups = startups;
            console.log('startups', this.startups);
        })
    }
}
