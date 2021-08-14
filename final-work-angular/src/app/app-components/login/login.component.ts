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
  nameInputValidator: boolean = true;
  passwordInputValidator: boolean = true;


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

  checkInputValidation(input1: string, input2:string) {
    if(input1.length > 0 && input2.length >0) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    if(this.checkInputValidation(this.f.password.value, this.f.username.value) == false){
      return;
    }
    if (this.form.invalid) {
      this.error = 'invalid input fields';
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
