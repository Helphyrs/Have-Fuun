import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreatmentJwtErrorService {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  constructor() { }

  handle403Error(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
