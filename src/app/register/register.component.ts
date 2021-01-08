import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { passwordValidator } from '../shared/password.validator';
import { forbiddenNameValidator } from '../shared/username.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  get username(): AbstractControl | null {
    return this.registrationForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.registrationForm.get('password');
  }

  get email(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  get roles(): FormArray {
    return this.registrationForm.get('roles') as FormArray;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            forbiddenNameValidator(/password/),
          ],
        ],
        email: [''],
        subscribe: [false],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
        address: this.formBuilder.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
        roles: this.formBuilder.array([]),
      },
      { validator: passwordValidator }
    );

    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }

  addRoles(): void {
    this.roles.push(this.formBuilder.control(''));
  }

  loadApiData(): void {
    this.registrationForm.patchValue({
      username: 'Bruce',
      email: 'carlos@hot',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '2663',
      },
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
    this.authService.registerUser(this.registrationForm.value).subscribe(
      (response: any) => {
        console.log('success!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/products']);
      },
      (error: any) => console.error('Error!', error)
    );
  }

}
