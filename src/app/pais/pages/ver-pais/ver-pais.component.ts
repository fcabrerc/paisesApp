import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Idd, Country } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // 116
  pais!: Country;

  // 114 Creamos un observable de la URL
  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService) { }

  ngOnInit(): void {
    // // 114
    // this.activateRoute.params
    //   .subscribe( params => {
    //     console.log(params);
    //     this.paisService.getPaisPorAlpha(params.id)
    //       .subscribe(pais => {
    //         console.log(pais);
    //       });
    //   });
    // 115 - sustituimos lo anterior por un switchMap de rxjs
    // 115 - recibe el observable param y devuelve el observable el resultado de getPaisPorAlpha
    this.activateRoute.params
      .pipe( 
        switchMap( (param) => this.paisService.getPaisPorAlpha(param.id) )
        //tap( console.log )
      )
      .subscribe (pais => {
        this.pais = pais[0]
      });
  }

}
