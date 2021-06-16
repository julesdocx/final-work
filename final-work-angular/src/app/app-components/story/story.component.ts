import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  chapters: boolean[] = [false, false, false, false, false]

  constructor() { }

  ngOnInit(): void {
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
}
