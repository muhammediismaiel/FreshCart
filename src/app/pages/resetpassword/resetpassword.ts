import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.css',
})
export class Resetpassword {
  step = 1;

  isLoadingForget = false;
  isLoadingVerify = false;
  isLoadingReset = false;

  private toaster = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  forgetPasswordGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  verifyResetCodeGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  resetPasswordGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  handleSubmitForgetPassword() {
    if (this.forgetPasswordGroup.invalid) {
      this.forgetPasswordGroup.markAllAsTouched();
      return;
    }

    this.isLoadingForget = true;
    this.resetPasswordGroup.get('email')?.patchValue(this.forgetPasswordGroup.value.email || '');

    this.authService
      .forgetPassword({ email: this.forgetPasswordGroup.value.email! })
      .pipe(finalize(() => (this.isLoadingForget = false)))
      .subscribe({
        next: () => {
          this.step = 2;
        },
        error: (err) => {
          this.toaster.error(err.message, '', { timeOut: 1500 });
        },
      });
  }

  handleSubmitVerifyResetCode() {
    if (this.verifyResetCodeGroup.invalid) {
      this.verifyResetCodeGroup.markAllAsTouched();
      return;
    }

    this.isLoadingVerify = true;
    this.authService
      .verifyCode({ resetCode: this.verifyResetCodeGroup.value.resetCode! })
      .pipe(finalize(() => (this.isLoadingVerify = false)))
      .subscribe({
        next: () => {
          this.step = 3;
        },
        error: (err) => {
          this.toaster.error(err.message, '', { timeOut: 1500 });
        },
      });
  }

  handleSubmitResetPassword() {
    if (this.resetPasswordGroup.invalid) {
      this.resetPasswordGroup.markAllAsTouched();
      return;
    }

    this.isLoadingReset = true;
    this.authService
      .resetPassword({
        email: this.resetPasswordGroup.value.email!,
        newPassword: this.resetPasswordGroup.value.newPassword!,
      })
      .pipe(finalize(() => (this.isLoadingReset = false)))
      .subscribe({
        next: (res) => {
          this.toaster.success('Password Reset Successfully', '', { timeOut: 1500 });
          this.authService.decodeToken(res.token);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toaster.error(err.message, '', { timeOut: 1500 });
        },
      });
  }
}
