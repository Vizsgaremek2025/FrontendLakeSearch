import { Component } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,LoginComponent,RegisterComponent,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {

    this.authService.loggedinUser.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.username = user.name;
      } else {
        this.isLoggedIn = false;
        this.username = '';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
