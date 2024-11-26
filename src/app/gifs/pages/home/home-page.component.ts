import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  standalone: false,
})
export class HomePageComponent {


  constructor( private gifsService: GifsService ){}

  public getGifs() {
    return this.gifsService.gifsList;
  }


}
