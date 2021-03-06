import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getStoriesByIds(stories: any[]) {
    let idString = '';
    stories.forEach((id: string) => {
      if (idString.length == 0){
        id.length > 0 ? idString = idString + id : null;
      } else {
        id.length > 0 ? idString = idString + ',' + id : null;
      }
    })
    return this.http.get(`${environment.apiUrl}/api/stories/list/${idString}`);
  }

  postStory(story: any) {
    try {
      console.log(story);
      this.http.post(`${environment.apiUrl}/api/stories/upload`, {story:story}, {responseType: 'text'})
      .subscribe(
          data => {
            console.log(data, 'storyId uplad');
            story.id = data;
            this.usersService.updateUserStory(story);
          },
          error => {
              console.log('authentication error', error);
          });      
    } catch (error) {
      console.log(error);
    }
  }

  updateStory(story: any) {
    try {
      this.http.post(`${environment.apiUrl}/api/stories/update`, {story: story}).subscribe(() => {
        this.usersService.updateUserStory(story);
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteStory(userId: string, storyId: string) {
    try {
      this.usersService.deleteUserStory(userId, storyId);
      this.http.delete(`${environment.apiUrl}/api/stories/delete/${storyId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getStories() {
    return this.http.get(`${environment.apiUrl}/api/stories/getall`)
  }

  async getStoryById(id: string) {
    return this.http.get(`${environment.apiUrl}/api/stories/getstory/${id}`);
  }
}
