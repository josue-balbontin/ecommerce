import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbard } from './components/navbard/navbard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , Navbard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
}
