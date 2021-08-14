import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './app-components/login/login.component';
import { RegistrationComponent } from './app-components/registration/registration.component';
import { ProfileComponent } from './app-components/profile/profile.component';
import { UploadComponent } from './app-components/upload/upload.component';
import { StoryComponent } from './app-components/story/story.component';
import { HomeComponent } from './app-components/home/home.component';
import { ClickOutDirective } from './directives/click-out.directive';
import { QuillModule } from 'ngx-quill';
import { TextEditorModule } from './ui-components/text-editor/text-editor.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    UploadComponent,
    StoryComponent,
  HomeComponent,
    ClickOutDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextEditorModule,
    QuillModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
