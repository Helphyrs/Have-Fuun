import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthServiceService } from '../Api/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentJwtErrorService {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private router: Router, private auth: AuthServiceService) { }

  handle403Error(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
