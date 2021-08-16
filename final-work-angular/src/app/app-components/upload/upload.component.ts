import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { QuillConfiguration } from "./quill-configuration";
import Quill from 'quill';
import { StoriesService } from 'src/app/services/stories.service';
import { ActivatedRoute, Router } from '@angular/router';

const font = Quill.import('formats/font')

font.whitelist = ['PT serif', 'Neue Haas Grotesk', 'PT sans']
Quill.register(font, true);

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  story: any;
  storyForm: FormGroup;
  selectedChapter: number = 0;
  quillConfiguration = QuillConfiguration;
  preview: boolean = false;
  editMetaData: boolean = false;
  chapterCount: number = 0;
  updateMode: boolean = false;
  id: string = '';
  submit: string = 'Submit';

  constructor(private formBuilder: FormBuilder, private storiesService: StoriesService, private router: Router, private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id') ?? ''
    this.storyForm = this.formBuilder.group({
      title: ['Untitled'],
      description: [''],
      author: [''],
      chapters: this.formBuilder.array([]),
    });

    if (this.id.length > 0) {
      this.submit = 'Update'
      this.storiesService.getStoryById(this.id).then((val)=> {
        val.subscribe((data: any) => {
          this.story = data;
          this.storyForm.patchValue({
            title: this.story.title,
            lastName: this.story.description,
            email: this.story.author,
          });
          this.story.chapters.forEach((element: any) => {
            this.chapters.push(this.formBuilder.group({
              name: [element.name],
              text: [element.text],
            }));
          });
        });
      });
    } else {
      this.addChapter();
    }
  }

  ngOnInit() {}

  stringify(value: string) {
    var parser = new DOMParser();
    var element = parser.parseFromString(value, "text/html");
    return element;
  }

  addChapter() {
    this.chapterCount += 1;
    this.chapters.push(this.newChapter());
  }

  get chapters(): FormArray {
    return this.storyForm.get("chapters") as FormArray;
  }

  get chapterControls() {
    return this.chapters['controls'];
  }

  newChapter(): FormGroup {
    return this.formBuilder.group({
      name: [`Chapter ${this.chapters.length + 1}`],
      text: [''],
    })
  }

  removeChapter(i: number) {
    this.chapters.removeAt(i);
  }

  onSubmit() { 
    if (this.id.length > 0) {
      this.storiesService.updateStory({
        title: this.storyForm.value.title,
        description: this.storyForm.value.description,
        author: this.storyForm.value.author,
        chapters: this.chapters.value,
        id: this.id
      });
    } else {
     this.storiesService.postStory({
       title: this.storyForm.value.title,
       description: this.storyForm.value.description,
       author: this.storyForm.value.author,
       chapters: this.chapters.value,
     });
    }
    this.router.navigate(['/home'])
  }

  checkOverflow (element: any) {
    if (element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth) {
          console.log(true);
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW || event.keyCode === KEY_CODE.UP_ARROW) {
      this.selectedChapter === this.chapterCount-1? this.selectedChapter += 1: null
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW || event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.selectedChapter === -1? this.selectedChapter -= 1: null
    }
  }
}
