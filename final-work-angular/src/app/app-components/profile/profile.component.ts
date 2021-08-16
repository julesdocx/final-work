import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  storyList: any[] = [];
  loading: boolean = true;
  id: string = '';
  constructor(private usersService: UsersService, private authService: AuthService, private storiesService : StoriesService, private route : ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
   // this.loadProfile()
  }

  getUser () {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getById(this.id).subscribe((val: any) => {
      console.log(val, 'user');
      this.user = new BehaviorSubject(val);
      if (val.stories) {
        const idArray = val.stories.map( (elem: any) => {
          return elem.id;
        });
        this.storiesService.getStoriesByIds(idArray).subscribe((list: any) => {
          this.storyList = list;
          console.log(list);
        });
      }
    });
  }

  goToStory(id: string) {
    this.router.navigate(['/readable', id]);
  }

  navigateToUpload(id: string) {
    this.router.navigate([`/upload/${id}`]);
  }

  removeStory(i: string) {
    this.storiesService.deleteStory(this.id, i);
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  deleteAccount() {
   // this.usersService.deleteUser()
  }
}

