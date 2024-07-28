import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Credentials {
  email: string;
  password: string;
}

interface SignupUser {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://freeapi.miniprojectideas.com/api/User';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Login`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError)
    );
  }

  signup(user: SignupUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Signup`, user).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
