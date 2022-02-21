import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  // 106 - Servicio para buscar paises
  private  apiUrl: string = 'https://restcountries.com/v3.1';
  // 106 - injectamos el módulo para hacer peticiones http
  constructor(private http: HttpClient) { }

  // 126 - Cream un mètode
  get httpParams () {
    return new HttpParams()
        .set('fields','name,capital,alpha2Code,flags,population,cca2');
  }

  // 106 -función para realizar la petición http del país
  buscarPais (termino:string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${termino}`;

    // Realizamos la petición get de la url montada
    // Vamos a retornar lo que nos devuelva
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  // 113 -función para realizar la petición http de la capital
  buscarCapital (termino:string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${termino}`;

    // Realizamos la petición get de la url montada
    // Vamos a retornar lo que nos devuelva
    return this.http.get<Country[]>( url, {params: this.httpParams} );
  }

  // 114 -función para obtener el país a partir del ID alpha
  getPaisPorAlpha (id:string): Observable<Country[]> {

    const url = `${this.apiUrl}/alpha/${id}`;

    // Realizamos la petición get de la url montada
    // Vamos a retornar lo que nos devuelva
    return this.http.get<Country[]>( url );
  }

  // 124 - función para realizar la petición http de los paises por region
  buscarPaisesPorRegion (region : string): Observable<Country[]> {
    // 126
    //const params = new HttpParams()
    //        .set('fields','name,capital,alpha2code,flags,population');


    const url = `${this.apiUrl}/region/${region}`;

    // Realizamos la petición get de la url montada
    // Vamos a retornar lo que nos devuelva
    return this.http.get<Country[]>( url, {params: this.httpParams} )
          .pipe(
            tap( console.log )
          );
  }

}
