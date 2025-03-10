import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LakesComponent } from './lakes/lakes.component';
import { LakeDetailsComponent } from './lake-details/lake-details.component';
import { CatchesComponent } from './catches/catches.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lakes', component: LakesComponent },
  { path: 'lake-details/:id', component: LakeDetailsComponent },
  { path: 'catches/:lakeId',component: CatchesComponent}
];

export const appRouter = provideRouter(routes);
