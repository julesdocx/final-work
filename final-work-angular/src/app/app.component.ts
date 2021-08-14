import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  notHome: boolean = false;
  currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor (private authService : AuthService, private router: Router, private location: Location) {
    this.isLoggedIn = this.authService.isAuthenticated$;
    console.log(this.isLoggedIn)
    this.currentUser = authService.currentUserSubject;
    this.router.events.subscribe(() => {
      if (this.location.path() != "") {
        this.notHome = true;
      } else {
        this.notHome = false;
      }
    });
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
