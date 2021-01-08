import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUserData: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      (err: any) => console.log(err)
    );
  }
}
