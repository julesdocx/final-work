import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  chapterCount: number[] = [0]

  constructor( private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required, Validators.email],
      chapterTitles: this.formBuilder.array([]),
      chapterContents: this.formBuilder.array([]),
    });
    this.chapterTitles.push(new FormControl(''));
    this.chapterContents.push(new FormControl(''));
  }

  ngOnInit() {
  }

  get chapterTitles() {
    return this.form.get('chapterTitles') as FormArray;
  }

  get chapterContents() {
    return this.form.get('chapterContents') as FormArray;
  }

  addChapter() {
    this.chapterCount.push(this.chapterCount.length)
    this.chapterTitles.push(new FormControl());
    this.chapterContents.push(new FormControl());
  }

  removeChapter() {
    this.chapterTitles.removeAt(this.chapterTitles.length - 1);
    this.chapterContents.removeAt(this.chapterContents.length - 1);
  }

  onSubmit() {
    console.log(this.form.value.chapterContents)
  }

}
