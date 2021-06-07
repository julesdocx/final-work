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
      chapters: new FormArray([])
    });
  }

  get f() {
    return this.form.controls;
  }

  get rolesFormArray() {
    return this.form.controls.chapters as FormArray;
  }

  ngOnInit(): void {

  }

  onSubmit() {

  }

  addCheckboxes() {
    this.chapterCount.forEach(() => this.rolesFormArray.push(new FormControl()));
  }


}
