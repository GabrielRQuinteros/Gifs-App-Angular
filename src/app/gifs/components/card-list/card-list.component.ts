import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
  standalone: false
})
export class CardListComponent implements OnInit{

  @Input()
  public gifs:Gif[]=[];

  ngOnInit(): void {
    if( ! this.gifs )
    throw new Error('Gif property is undefined.');
  }

}
