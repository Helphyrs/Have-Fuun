import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../../Api/admin-service.service';

@Injectable({ providedIn: 'root' })
export class adminArticleResolver implements Resolve<any> {

  constructor(private adminS: AdminServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.adminS.getAllArticleAdmin();
  }
}