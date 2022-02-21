import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent  {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  hayError: boolean = false;  // 107

   // 124 - inyectamos nuestro servicio
   constructor(private paisService: PaisService) { }

   // 123 - clase CSS condicional
  getClassCSS (region: string) : string {
    return (this.regionActiva === region) ? 'btn btn-primary' : 'btn btn-outline-primary' ;
  }

  activarRegion( region: string){
    this.regionActiva = region;
  }

  // 124: Buscar paises por region
  buscar(region : string) {

    this.hayError = false;
    console.log(region);
    this.paises = [];

    this.paisService.buscarPaisesPorRegion (region)
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

  activarBuscarRegion( region: string){
    if (this.regionActiva === region) return;
    this.activarRegion(region);
    this.buscar(region);
  }

}
