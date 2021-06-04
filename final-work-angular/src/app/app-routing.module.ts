import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app-components/login/login.component';
import { ProfileComponent } from './app-components/profile/profile.component';
import { RegistrationComponent } from './app-components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/profile',  pathMatch: 'full' },
  { path: 'profile', component: RegistrationComponent, canActivate : [AuthGuard], pathMatch: 'full'},
  { path: 'login', component : LoginComponent },
  { path: 'sign-up', component : RegistrationComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
