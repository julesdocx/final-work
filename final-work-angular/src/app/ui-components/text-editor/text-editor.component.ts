import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuillConfiguration } from "./quill-configuration";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {

  quillConfiguration = QuillConfiguration;
  @Input() control: FormControl;

  constructor() {
    this.control =  new FormControl() || null
  }

  ngOnInit(): void {
  }

}