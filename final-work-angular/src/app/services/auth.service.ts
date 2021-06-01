import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken;
  public isAuthenticated$: boolean;
  public userId : string = '';

  constructor(private router: Router, private http: HttpClient) {
    const localStorageData: any = localStorage.getItem('currentUser')
    if(localStorageData) {
      this.isAuthenticated$ = true;
      this.accessToken = localStorageData.token;
    } else {
      this.isAuthenticated$ = false;
      this.accessToken = null
    } 
  }

  public get token(): any {
        return this.accessToken;
  }

  login(username: string, password: string) {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/login`, { username, password })
        .pipe(map(res => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const newdecodedToken: any = jwt_decode(res.token)
            console.log(newdecodedToken)
            this.userId = newdecodedToken.id;
            localStorage.setItem('currentUser', JSON.stringify({token: res.token, email: newdecodedToken.email}));
            // this.currentUserSubject.next({token: res.token, email: newdecodedToken.email});
            this.accessToken = res.token
            return res;
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isAuthenticated$ = false
    //this.currentUserSubject.next(null);
    //this.router.navigate(['/login']);
  }
}
