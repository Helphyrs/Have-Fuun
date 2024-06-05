import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AdminServiceService } from '../Api/admin-service.service';

export const adminGuardGuard: CanActivateFn = () => {
  const auth = inject(AdminServiceService);
  const router = inject(Router);
  return auth.isAdmin().pipe(
    map((data: boolean) => {
      if (data) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    catchError((error) => {
      console.error('Error checking admin status', error);
      router.navigate(['/']);
      return of(false);
    })
  );

};
