import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLogin =  authService.isLogin.getValue();
  if(!isLogin){
    router.navigate(['/login']);
  }
  return isLogin;
};
