import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AdminServiceService } from '../../Api/admin-service.service';

@Injectable({ providedIn: 'root' })
export class adminFormResolver implements Resolve<any> {

  constructor(private adminS: AdminServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.adminS.getAllFormsAdmin();
  }
}