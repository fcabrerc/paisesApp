import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {cursor: pointer;}
    `
  ]
})
export class PorPaisComponent  {

  termino: string = '';
  hayError: boolean = false;  // 107
  paises: Country[] = [];     // 109
  paisesSugeridos: Country[] = [];     // 128
  mostrarSugerencias: boolean = false;

  // 106 - inyectamos nuestro servicio
  constructor(private paisService: PaisService) { }

  // 111: le pasamos el argumento termino a la función
  buscar(termino:string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    // 106 i 107
    this.paisService.buscarPais (this.termino)
    .subscribe (
      (resp) => {
        console.log(resp);
        // 109
        this.paises = resp;
      }, (err) => {
        this.hayError = true;
        console.log('Error');
        console.info(err);
        // 109
        this.paises = [];
      }
    );
  }

  // 112
  sugerencias (termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    // 128
    this.paisService.buscarPais( termino)
      .subscribe ( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        (err) => this.paisesSugeridos = []
        );
  }

  // 128
  buscarSugerido (termino:string) {
    console.log(termino);
    this.buscar(termino);
  }

}
