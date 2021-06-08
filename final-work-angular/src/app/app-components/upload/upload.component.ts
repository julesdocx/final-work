import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  chapterCount: number[] = [1];

  constructor( private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required, Validators.email],
      chapterTitles: new FormArray([]),
      chapterContents: new FormArray([])
    });
  }

  ngOnInit() {
    this.addChapters();
  }

  get f() {
    return this.form.controls;
  }

  get titlesFormArray() {
    return this.form.controls.chapterTitles as FormArray;
  }

  get contentsFormArray() {
    return this.form.controls.chapterContents as FormArray;
  }

  onSubmit() {

  }

  addChapters() {
    this.chapterCount.forEach(() => this.titlesFormArray.push(new FormControl()));
    this.chapterCount.forEach(() => this.contentsFormArray.push(new FormControl()));
  }
}
