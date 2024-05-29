import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServiceService } from '../Api/users-service.service';
import { UserWithoutPassword } from '../../Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<UserWithoutPassword> {

  constructor(private uS: UsersServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<UserWithoutPassword> {
    let userId: number = parseInt(route.params['userId']);
    return this.uS.getUserById(userId)
  }

}
