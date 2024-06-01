import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsServiceService } from '../../Api/forms-service.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class adminFormResolver implements Resolve<any> {

  constructor(private fS: FormsServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.fS.getAllForms();
  }
}