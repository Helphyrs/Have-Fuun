import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Login } from '../../Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      let bool = this.loginWithToken();
      bool.subscribe(data => {
        data ? this.isAuth.next(true) : this.isAuth.next(false);
      })
    } else {
      this.isAuth.next(false);
    }

  }

  get isAuth$(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  isAuth = new Subject<boolean>();

  apiUrlConnect: string = environment.apiUrlConnect;

  login(auth: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrlConnect}/`, auth)
  }
  loginWithToken(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrlConnect}/`,)
  }
}
