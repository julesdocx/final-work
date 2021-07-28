import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuillConfiguration } from "./quill-configuration";
import Quill from 'quill'

const font = Quill.import('formats/font')
// We do not add Aref Ruqaa since it is the default
font.whitelist = ['PT serif', 'Neue Haas Grotesk', 'PT sans']
Quill.register(font, true)

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