import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,) { }

  register(user: any) {
    console.log('register triggered!', user);
    this.http.post(`${environment.apiUrl}/auth/register`, {user}).pipe(first())
    .subscribe(
        data => {
          console.log('gelukt')
        },
        error => {
            console.log('authentication error', error);
        });
  }

  getByEmail(id: string) {
    return this.http.get(`${environment.apiUrl}/api/user/${id}`);
  }
}
