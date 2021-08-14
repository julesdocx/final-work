import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from 'src/app/services/stories.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  chapters: boolean[] = [false, false, false, false, false]
  storyId: string;
  story: any;
  selectedChapter: number = 0;

  constructor(private route: ActivatedRoute, private storiesServie: StoriesService) {
    this.storyId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    console.log(this.storyId);
    let localObject = localStorage.getItem(this.storyId) ?? '';
    console.log(localObject);
    localObject == '' ? this.getStory() : this.story = JSON.parse(localObject);
  }

  showChapter(id: number) {
    this.chapters.forEach( (x, index) => {
      if (id == index) {
        this.chapters[index] = !this.chapters[index]
      } else {
        this.chapters[index] = false;
      }
    })
    console.log(this.chapters, this.chapters[id] )
  }

  getStory(){
    this.storiesServie.getStoryById(this.storyId).then((val)=> {
      val.subscribe((data: any) => {
        this.story = data;
        localStorage.setItem(this.storyId, JSON.stringify(this.story));
      });
    });
    // this.story = {title: 'Titled', description: '', author: 'authorized', chapters: [{name: 'Hoofdstuk 1', text: 'wow'}, {name: 'Chapter 2', text: 'howla' }, {name: 'Chapter 3', text: 'shiii'}]}
  }
}
