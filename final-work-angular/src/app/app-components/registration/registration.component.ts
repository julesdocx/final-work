import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean = true;


  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator]],
      repeatPassword:  ['', this.isAddMode ? Validators.required : Validators.nullValidator],
    }, {validator: MustMatch('password', 'repeatPassword')});
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }


  onSubmit() {
    if(this.isAddMode) {  
      this.usersService.register({
        email: this.form.value.email,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
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
  }
}