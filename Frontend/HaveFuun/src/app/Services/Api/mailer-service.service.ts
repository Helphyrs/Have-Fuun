import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailerServiceService {

  constructor(private http: HttpClient) { }

  apiUrlMailer: string = environment.apiUrlMailer;

  sendMail(content: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlMailer}/`, content);
  }
}
