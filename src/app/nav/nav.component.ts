import { Component } from '@angular/core';
import { AppComponent } from "../app.component";
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
