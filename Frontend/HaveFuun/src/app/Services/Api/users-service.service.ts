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
  getUserByToken(): Observable<UserWithoutPassword> {
    return this.http.get<UserWithoutPassword>(`${this.apiUrlUsers}/token/`)
  }
  getUserAllInformationByToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/allInfo/token/`);
  }
  editUserByToken(user: User | UserWithoutPassword): Observable<any> {
    return this.http.put<any>(`${this.apiUrlUsers}/edit/`, user)
  }
  deleteUserById(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlUsers}/${userId}`)
  }
  deleteUserByToken(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlUsers}/delete/`)
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/admin/all/`)
  }
  getUserByIdAdmin(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/admin/user/${userId}`)
  }
  getAllUserInfoAdmin(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/admin/user/all/${userId}`)
  }
  deleteUserByIdAdmin(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlUsers}/admin/delete/${userId}`)
  }
  isAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/admin/isAdmin/`)
  }

}
