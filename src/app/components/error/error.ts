import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  @Input() error : string = '';
  @Output() accion : EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onClick() {
    this.accion.emit();
  }


}
