import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private http: HttpClient,) { }

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
    
  }
}
