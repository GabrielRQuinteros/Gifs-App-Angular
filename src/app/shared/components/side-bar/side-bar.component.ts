import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor( private gifsService: GifsService ){};

  get tagHistory(): string[] {
    return this.gifsService.tagsHistory;
  }

  public searchTag( tag: string ):void {
    this.gifsService.searchTag( tag );
  }

}
