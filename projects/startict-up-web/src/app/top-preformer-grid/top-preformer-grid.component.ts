import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-top-preformer-grid',
  templateUrl: './top-preformer-grid.component.html',
  styleUrls: ['./top-preformer-grid.component.css']
})
export class TopPreformerGridComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'Company One', cols: 3, rows: 4, color: '#5b4b49'},
    {text: 'Company Two', cols: 1, rows: 2, color: '#5b4b49'},
    {text: 'Company Three', cols: 1, rows:3, color: '#5b4b49'},
    {text: 'Company Four', cols: 3, rows: 1, color: '#5b4b49'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
