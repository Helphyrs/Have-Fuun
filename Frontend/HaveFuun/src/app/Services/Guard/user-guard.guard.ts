import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthServiceService } from '../Api/auth-service.service';

export const userGuardGuard: CanActivateFn = () => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);
  return auth.loginWithToken().pipe(
    map((data: boolean) => {
      if (data) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    catchError((error) => {
      console.error('Error checking login status', error);
      router.navigate(['/']);
      return of(false);
    })
  );

};
