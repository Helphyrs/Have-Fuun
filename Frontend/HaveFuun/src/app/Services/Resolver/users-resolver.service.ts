import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServiceService } from '../Api/users-service.service';
import { User, UserWithoutPassword } from '../../Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<UserWithoutPassword> {

  constructor(private uS: UsersServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserWithoutPassword> {
    let userId: number = parseInt(route.params['userId']);
    return this.uS.getUserById(userId)
  }

}
