import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
public email: string = '';

  constructor(
    public authService: AuthService
  ) {}
  
  ngOnInit() {

  }

  forgotPassword() {
    this.authService.ForgotPassword(this.email);
    this.email = '';
  }

}
