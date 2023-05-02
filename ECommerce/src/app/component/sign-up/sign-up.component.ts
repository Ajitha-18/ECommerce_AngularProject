import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string = '';
  password : string = '';

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    
  }

  SignUp() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.authService.SignUp(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

}
