import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Sector, Startup } from 'projects/libs/src/model';
import Fuse from 'fuse.js';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
@Component({
    selector: 'app-startups-list',
    templateUrl: './startups-list.component.html',
    styleUrls: ['./startups-list.component.scss']
})
export class StartupsListComponent implements OnInit {
    focus;
    constructor(private firebase: FirebaseService) {
    }

    startups: Startup[] = [];
    sectors: Record<string, Sector>;

    filteredStartups: Startup[] = [];
    filteredStartupsBySector: Startup[] = [];

    filterSector: string | null = null;
    filterText: string = '';

    searchControl = new FormControl();

    ngOnInit() {
        this.firebase.startups.subscribe((startups: Startup[]) => {
            this.startups = startups;
            this.filteredStartupsBySector = [...startups];
            this.filteredStartups = this.filteredStartupsBySector;
            console.log('startups', this.startups);
        })
        this.firebase.sectors.subscribe((sectors: Sector[]) => {
            this.sectors = sectors.reduce((a, v) => ({ ...a, [v.sectorName]: v }), {});
            console.log('sectorts', this.sectors);
        })

        this.searchControl.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(text => {
            this.filterText = text;
            this.filterByText();
        })
    }

    filterBySectors(sector) {
        if (this.filterSector || this.filterSector == sector) {
            this.filteredStartupsBySector = [...this.startups];
            this.filterSector = null;
        } else {
            this.filterSector = sector;
            this.filteredStartupsBySector = this.startups.filter(x => x.sectors.includes(sector));
        }
        this.filterByText()
    }

    filterByText() {
        if (!this.filterText.trim()) {
            this.filteredStartups = this.filteredStartupsBySector;
            return;
        }
        const fuse = new Fuse(this.filteredStartupsBySector, {
            keys: ['startupName', 'description', 'founderName', 'email', 'sectors']
        });
        const result = fuse.search(this.filterText);
        this.filteredStartups = result.map(x => x.item);
    }


}
