import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StoriesService } from 'src/app/services/stories.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: BehaviorSubject<any> = new BehaviorSubject<any>({firstname: '', lastname: '', email: '', storyReferences: ''});
  storyList: any[] = [];
  loading: boolean = true;

  constructor(private usersService: UsersService, private authService: AuthService, private storiesService : StoriesService) { }

  ngOnInit(): void {
    this.loadProfile()
  }

  async loadProfile() {
    try {
      const userId = await this.authService.userId;
      this.usersService.getById(userId).subscribe((val: any)=> {
        console.log(val);
        this.user = new BehaviorSubject(val)
        if (val.storyReferences.length > 0) {
          this.storiesService.getStoriesByIds(val.storyReferences).subscribe((list: any) => {
            this.storyList = list;
            console.log(list);
          });
        }
      });
    } catch (err) {
      console.log('Something went wrong while loading the profile', err)
    }
  }
}
