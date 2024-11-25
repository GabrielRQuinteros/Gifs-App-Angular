import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
  standalone: false
})
export class SearchBoxComponent {

  /// ESTO ES PARA OBTENER UNA REFERENCIA AL ELEMENTO HTML SIN HACER documento.querySelector()
  @ViewChild("txtTagInput") // <-- Selector del elemento HTML
  public tagInput!: ElementRef<HTMLInputElement>;

  // @ViewChildren() --> ES PARA OBTENER UN ARRAY DE ELEMENTOS HTML


  constructor( private gifsService: GifsService ){};

  // public searchTag( newTag: string ) {
  public searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag( newTag );
    this.tagInput.nativeElement.value="";
  }
}
