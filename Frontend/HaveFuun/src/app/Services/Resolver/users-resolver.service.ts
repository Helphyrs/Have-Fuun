import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServiceService } from '../Api/users-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<any> {

  constructor(private uS: UsersServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.uS.getUserAllInformationByToken()
  }

}
