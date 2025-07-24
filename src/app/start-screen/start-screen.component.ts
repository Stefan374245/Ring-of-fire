import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import hinzufügen

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(private router: Router) {} // Router im Konstruktor injizieren

  newGame() {
    this.router.navigate(['/game']);
  }
}
