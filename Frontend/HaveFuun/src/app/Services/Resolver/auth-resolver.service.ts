import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthServiceService } from '../Api/auth-service.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {

  constructor(private authService: AuthServiceService, private router: Router) { }

  resolve(): Observable<boolean> {
    return this.authService.loginWithToken().pipe(
      map(response => {
        console.log(response)
        if (response) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );

  }
}
