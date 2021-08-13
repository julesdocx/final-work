import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { QuillConfiguration } from "./quill-configuration";
import Quill from 'quill';

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
  storyForm: FormGroup;
  selectedChapter: number = 0;
  quillConfiguration = QuillConfiguration;
  preview: boolean = false;
  editMetaData: boolean = false;
  chapterCount: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.storyForm = this.formBuilder.group({
      title: ['Untitled'],
      description: ['e'],
      author: ['e'],
      chapters: this.formBuilder.array([]),
    });
    this.addChapter();
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

  onSubmit() { 3
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
