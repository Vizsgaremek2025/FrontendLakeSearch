import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LakesComponent } from './lakes/lakes.component';
import { LakeDetailsComponent } from './lake-details/lake-details.component';
import { CatchesComponent } from './catches/catches.component';
import { NewcatchComponent } from './newcatch/newcatch.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lakes', component: LakesComponent },
  { path: 'lake-details/:id', component: LakeDetailsComponent },
  { path: 'catches/:lakeId',component: CatchesComponent},
  { path: 'newcatch',component: NewcatchComponent},
  { path: 'profile',component: ProfileComponent}
];

export const appRouter = provideRouter(routes);
