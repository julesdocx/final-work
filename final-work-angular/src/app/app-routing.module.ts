import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-components/home/home.component';
import { LoginComponent } from './app-components/login/login.component';
import { ProfileComponent } from './app-components/profile/profile.component';
import { RegistrationComponent } from './app-components/registration/registration.component';
import { StoryComponent } from './app-components/story/story.component';
import { UploadComponent } from './app-components/upload/upload.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, redirectTo: '', pathMatch: 'full' },
  { path: 'seelisVanderAuweraert', component: ProfileComponent, canActivate : [AuthGuard], pathMatch: 'full'},
  { path: 'log-in', component : LoginComponent },
  { path: 'readable/:id', component : StoryComponent },
  { path: 'strepen', component : StoryComponent },
  { path: 'upload', component : UploadComponent },
  { path: 'sign-up', component : RegistrationComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
