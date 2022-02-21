import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent  {

  termino: string = '';
  hayError: boolean = false;  // 107
  paises: Country[] = [];     // 109

  // 106 - inyectamos nuestro servicio
  constructor(private paisService: PaisService) { }

  // 111: le pasamos el argumento termino a la función
  buscar(termino:string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    // 106 i 107
    this.paisService.buscarCapital (this.termino)
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
    //TODO
  }

}
