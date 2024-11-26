import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  /// CONSTANTES
  private _apiKey:string= "QjG5436goBPLdzGbxKvfBy0PA6QOg3xx";
  private _gifsNumberLimit: number= 8;



  private _tagsHistory: string[]=[]; /// LOS ATRIBUTOS PRIVADOS EN JS DEBEN INICIAR CON _
  private _gifsList: Gif[] = [];


  /// PARA FUNCIONALIDADES AVANZADAS DE PETICIONES HTTP USAMOS ESTE SERVICIO
  /// Y SE INICIALIZA EN LOS PROVIDERS DE LA app.module.ts, aca se inyectó
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory():string[] {
    return [...this._tagsHistory]; /// LOS ARRAYS EN JS SE PASAN POR REFERENCIA, ACA DEVUELVO UNA COPIA DEL TAGS HISTORY
  }

  private normalizeTag( tag: string ): string {
    return tag.trim()
              .toLowerCase()
              ;
  }

  private organizeTags( tag: string ) {

    if( this._tagsHistory.includes( tag ) ) { //SI EL TAG EXISTE LO REMUEVO
      this._tagsHistory = this.tagsHistory.filter( tagStored => tagStored != tag );
    }

    this._tagsHistory.unshift( tag ); // GUARDO EL TAG BUSCADO.
    this._tagsHistory= this.tagsHistory.splice( 0, 10 );
    this.saveLocalStorage();
  }

  public searchTag( searchedTag: string ): void{
    const normalizedTag = this.normalizeTag( searchedTag );
    if( normalizedTag.length == 0 ) return;
    this.organizeTags( normalizedTag );

    ///////////////////////////////////////////////////////////////////////////////
    /// ESTO ES EN JS VANILLA, EN ANGULAR SE REEMPLAZA POR EL USO DEL SERVICIO HTTP.
    // const response: Response= await fetch( this.getApiRequest(normalizedTag) );
    // if( !response.ok ) {
    //   alert("Error al consultar la API GIPHY");
    //   return;
    // }
    // debugger
    // const page: GifsPage = await response.json();
    // console.log( page );
    //////////////////////////////////////////////////////////////////////////////////
    this.http.get<SearchResponse>( this.getApiRequest(normalizedTag) )
              .subscribe( (searchResponse)=> {
                  this._gifsList = searchResponse.data;
              } );

  }

  private getApiRequest( tag: string ): string {
    return `https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${tag}&limit=${this._gifsNumberLimit}`;
  }


  get gifsList(): Gif[] {
    return [...this._gifsList];
  }

  private saveLocalStorage() {
    localStorage.setItem( "history", JSON.stringify( this._tagsHistory ) );
  }

  private loadLocalStorage():void {
    const historyAsString: string|null = localStorage.getItem("history");
    if( !historyAsString ) return;
    this._tagsHistory = JSON.parse( historyAsString );
    if( this._tagsHistory.length == 0 ) return;
    this.searchTag(this._tagsHistory[0]);
  }

}
