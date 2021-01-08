import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../models/User';

export const ANONYMOUS_USER: User = {
  id: 0,
  username: '',
  email: '',
  password: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/auth/register';
  private loginUrl = 'http://localhost:3000/api/auth/login';

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: User): any {
    return this.http.post<User>(this.registerUrl, user).pipe(
      shareReplay(),
      tap(() => this.subject.next(user))
    );
  }

  loginUser(user: any): any {
    return this.http.post<any>(this.loginUrl, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
