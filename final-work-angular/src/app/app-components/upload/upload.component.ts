import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  textEditorForm: FormGroup;
  preview: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.textEditorForm = this.formBuilder.group({
      title: [
        'Chapter Title 1'
      ],
      text: [
        `<h2><u>This is </u>a <span style=\"color: rgb(240, 102, 102);\">RICH</span> <strong>text editor</strong> <em>for</em> </h2><h3><span style=\"color: rgb(153, 51, 255);\">I hope you </span><strong style=\"color: rgb(153, 51, 255);\">like it!</strong></h3>`
      ]
    });
  }

  ngOnInit() {
  }


  get textControls() {
    return this.textEditorForm.controls.text as FormControl;
  }

  stringify(value: string) {
    var parser = new DOMParser();
    var element = parser.parseFromString(value, "text/html")
    return element;
  }
}
