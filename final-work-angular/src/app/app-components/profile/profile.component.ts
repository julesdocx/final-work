import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  loading: boolean = true;

  constructor(private usersService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usersService.getByEmail(this.authService.userId).subscribe((val: any)=> {
      console.log(val);
      this.user = val;

    });
  }
}
