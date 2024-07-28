import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tmb-log-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginObj = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.loginObj).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert('Login Success');
            localStorage.setItem('token', res.data.token);
            this.router.navigateByUrl('/');
          } else {
            this.errorMessage = res.message;
          }
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please try again!';
          console.error('Login error:', err);
        }
      });
    }
  }
}
