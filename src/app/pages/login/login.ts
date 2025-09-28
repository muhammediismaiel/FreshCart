import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router , RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  isLoading = false;
  private authService =  inject(AuthService)
  constructor(
    // private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }
  loginGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z].{5,}/),
    ]),
  });

  handleSubmit() {
    this.loginGroup.markAllAsTouched();
    if (this.loginGroup.invalid) return;
    this.isLoading = true;
    this.authService.login(this.loginGroup.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success('Registration successful!', 'Success');
          const token = response.token;
        localStorage.setItem('token', token);
        this.authService.decodeToken(token);
        this.loginGroup.reset();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;

        if (error?.error?.message) {
          this.toastr.error(error.error.message, 'Error');
        }
      },
    });
  }

  get emailController() {
    return this.loginGroup.get('email');
  }

  get passwordController() {
    return this.loginGroup.get('password');
  }

  get emailErrorMsg() {
    if (this.emailController?.touched && this.emailController?.errors) {
      if (this.emailController?.getError('required')) {
        return 'email is required';
      } else if (this.emailController?.getError('email')) {
        return 'email must be a valid email address';
      }
    }
    return '';
  }

  get passwordErrorMsg() {
    if (this.passwordController?.touched && this.passwordController?.errors) {
      if (this.passwordController?.getError('required')) {
        return 'password is required';
      } else if (this.passwordController?.getError('pattern')) {
        return 'password must start with a capital letter and be at least 6 characters long';
      }
    }
    return '';
  }
}
