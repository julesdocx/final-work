import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import { QuillModule } from 'ngx-quill'
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [CommonModule, QuillModule, ReactiveFormsModule],
  declarations: [TextEditorComponent],
  exports: [TextEditorComponent] 
})
export class TextEditorModule {

 }
