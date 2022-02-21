import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

// 113 vamos a recibir una propiedad
@Input() placeholder: string = "";

// 111 Tenemos que emitir el buscar
@Output() onEnter: EventEmitter<string> = new EventEmitter();
// 112
@Output() onDebounce: EventEmitter<string> = new EventEmitter();

// 112
debouncer: Subject<string> = new Subject;
termino: string = '';

ngOnInit() {
  // 112 debouncer seria un observable
  // 112 .pipe espera 300 milisegundos antes de realizar el .subscribe
  this.debouncer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      console.log('debouncer: ', valor);
      this.onDebounce.emit( valor );
    })
}

buscar() {
  // 111 Emitimos el térmno
  this.onEnter.emit(this.termino);
}

// 112
teclaPresionada() {
  //Llama al debouncer y emite un valor. Lo recoge els subscribe
  this.debouncer.next(this.termino);
}

}
