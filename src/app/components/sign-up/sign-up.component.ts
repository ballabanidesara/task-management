import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tmb-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  
  user = { username: '', email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signUp(form: NgForm) {
    if (form.valid) {
      this.authService.signup(this.user).subscribe({
        next: (response: any) => {
          if (response.result) {
            alert('Signup Successful');
            localStorage.setItem('token', response.data.token);
            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.errorMessage = 'Signup failed. Please try again!';
          console.error('Signup failed:', error);
        }
      });
    }
  }
}
