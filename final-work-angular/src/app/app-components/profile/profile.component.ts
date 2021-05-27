import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    console.log(this.usersService.getByEmail('jules.docx@student.ehb.be').subscribe((val: any)=> {
      console.log(val);
      this.user = val;
    }));
  }
}
