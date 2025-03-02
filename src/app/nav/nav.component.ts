import { Component } from '@angular/core';
import { AppComponent } from "../app.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,LoginComponent,RegisterComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
