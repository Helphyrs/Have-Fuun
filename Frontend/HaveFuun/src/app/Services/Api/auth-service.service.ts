import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  apiUrlConnect: string = environment.apiUrlConnect;

  login(auth: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrlConnect}/`, { auth })
  }

}
