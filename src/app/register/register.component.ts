import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.auth.registerUser(this.registerUserData).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      (err: any) => console.log(err)
    );
  }

}
