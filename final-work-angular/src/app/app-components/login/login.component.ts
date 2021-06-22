import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  error = "";

  @Output() outputValue = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  close(event: MouseEvent) {
      console.log('clickout');
      this.outputValue.emit(false);
      event.stopPropagation()

  }

  ngOnInit(): void {
    //this.authService.logout()
  }

  get f() { return this.form.controls; }

  onSubmit(){

    if (this.form.invalid) {
        return;
    }
    this.authService
        .login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              console.log('welcome User');
              this.router.navigate(['']);
            },
            error => {
                this.error = error.error.message;
                console.log('authentication error', error);
            });
  }
}
