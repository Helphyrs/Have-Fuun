import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../../Api/admin-service.service';

@Injectable({ providedIn: 'root' })
export class adminResolverResolver implements Resolve<any> {

  constructor(private adminS: AdminServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let userId: number = parseInt(route.params['id'])

    return userId ? this.adminS.getAllUserInfoAdmin(userId) : this.adminS.getAllUsers();
  }
}
