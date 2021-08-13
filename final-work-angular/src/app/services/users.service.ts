import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  async register(user: any) {
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

  getById(id: string) {
    console.log(id)
    return this.http.get(`${environment.apiUrl}/api/users/user/${id}`);
  }

  async updateUserStory(story: any) {
    const userId = this.authService.userId;
    try {
      this.http.post(`${environment.apiUrl}/api/users/updatestory`, {userId: userId, story: story});
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserStory (id: string) {
    	try {
        this.http.delete(`${environment.apiUrl}/api/users/deletestory/${id}`);
      } catch (error) {
        console.log(error)
      }
  }
}
