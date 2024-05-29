import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserWithCcg, UserWithoutPassword, User } from '../../Models/userModel';


@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }
  apiUrlUsers: string = environment.apiUrlUsers

  addUser(user: UserWithCcg): Observable<any> {
    return this.http.post<any>(`${this.apiUrlUsers}/`, user)
  }
  getUserById(userId: number): Observable<UserWithoutPassword> {
    return this.http.get<UserWithoutPassword>(`${this.apiUrlUsers}/${userId}`)
  }
  editUserById(userId: number, user: User | UserWithoutPassword): Observable<any> {
    return this.http.put<any>(`${this.apiUrlUsers}/${userId}`, user)
  }
  deleteUserById(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlUsers}/${userId}`)
  }

}
