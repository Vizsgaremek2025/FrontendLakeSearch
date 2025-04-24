import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LakesComponent } from './lakes/lakes.component';
import { LakeDetailsComponent } from './lake-details/lake-details.component';
import { CatchesComponent } from './catches/catches.component';
import { NewcatchComponent } from './newcatch/newcatch.component';
import { ProfileComponent } from './profile/profile.component';
import { UserCatchesComponent } from './user-catches/user-catches.component';
import { AuthGuard } from './guards/auth.guard';
import { FavoritesLakeComponent } from './favorites-lake/favorites-lake.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lakes', component: LakesComponent ,canActivate: [AuthGuard]},
  { path: 'lake-details/:id', component: LakeDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'catches/:lakeId',component: CatchesComponent ,canActivate: [AuthGuard]},
  { path: 'newcatch',component: NewcatchComponent ,canActivate: [AuthGuard]},
  { path: 'profile',component: ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'user-catches',component: UserCatchesComponent ,canActivate: [AuthGuard]},
  { path: 'favorites-lake',component: FavoritesLakeComponent ,canActivate: [AuthGuard]}
];

export const appRouter = provideRouter(routes);
