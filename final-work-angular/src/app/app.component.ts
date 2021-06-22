import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Auwer-app';
  isLoggedIn = false;
  menuToggle = false;
  loginPageRequest = false;

  constructor (private authService : AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated$
    console.log(this.isLoggedIn)
  }

  loginFormUpdate(state: boolean) {
    console.log(state);
    this.loginPageRequest = state
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  upload() {
    
  }

  getUsername() {
    return 'Jules Docx';
  }
}
