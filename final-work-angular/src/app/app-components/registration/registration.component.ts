import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  error = "";
  form: FormGroup;
  isAddMode: boolean = true;
  nameInputValidator: boolean = true;
  password1InputValidator: boolean = true;
  password2InputValidator: boolean = true;
  emailInputValidator: boolean = true;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router : Router) {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator]],
      repeatPassword:  ['', this.isAddMode ? Validators.required : Validators.nullValidator],
    }, {validator: MustMatch('password', 'repeatPassword')});
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  checkPasswordValidation(input1: string, input2:string) {
    if(input1.length > 6 && input2.length > 6) {
      return true;
    } else {
      return false;
    }
  }

  checkInputValidation(input1: string, input2:string, input3:string) {
    if(input1.length > 0 && input2.length >0 && input3.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if(this.checkInputValidation(this.f.password.value, this.f.firstname.value, this.f.email.value) == false){
      return;
    }
    if (this.form.invalid) {
      this.error = 'Invalid input fields';
      return;
    }
    if(this.isAddMode) {  
      this.usersService.register({
        email: this.form.value.email,
        username: this.form.value.firstname,
        password: this.form.value.password,
      })
    } else {
      // this.usersService.update({
      //   email: this.form.value.email,
      //   firstName: this.form.value.firstName,
      //   lastName: this.form.value.lastName,
      //   password: this.form.value.password,
      // })
    }
    console.log(this.form.value, {
//        id: this.user.id,
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
    });
    this.router.navigate(['/login'])
  }
}
