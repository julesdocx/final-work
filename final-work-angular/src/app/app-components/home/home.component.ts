import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StoriesService } from 'src/app/services/stories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stories: any[] = [];

  constructor(private storiesService: StoriesService, private router: Router) {
    this.getAllStories();
    console.log(this.stories)
   }

  ngOnInit(): void {

  }

  getAllStories() {
    // this.storiesService.getStories().then((val)=> {
    //   val.subscribe((data: any) => {
    //     this.stories = data
    //   });
    // });
    this.stories = [{id: 'fzjuR4C5lbqCqe1ecFZ9', title: 'Titled', author:'authorized'}]
  }

  goToStory(id: string) {
    this.router.navigate(['/readable', id]);
  }
}
