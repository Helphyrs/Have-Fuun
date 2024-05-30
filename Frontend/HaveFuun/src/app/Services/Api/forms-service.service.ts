import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form, FormResult } from '../../Models/formModel'

@Injectable({
  providedIn: 'root'
})
export class FormsServiceService {

  constructor(private http: HttpClient) { }

  apiUrlForms: string = environment.apiUrlForms;
  apiUrlFormResult: string = environment.apiUrlFormResult

  // FORMRESULT

  addResult(form: FormResult): Observable<any> {
    return this.http.post<any>(`${this.apiUrlFormResult}/`, form)
  }

  // FORM

  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiUrlForms}/all`);
  }

  getFormById(formId: number): Observable<Form> {
    return this.http.get<Form>(`${this.apiUrlForms}/${formId}`);
  }

  getFormByName(formName: string): Observable<Form> {
    return this.http.get<Form>(`${this.apiUrlForms}/name/${formName}`);
  }

  addForm(form: Form): Observable<any> {
    return this.http.post<any>(`${this.apiUrlForms}/`, form);
  }

  editFormById(formId: number, form: Form): Observable<any> {
    return this.http.put<any>(`${this.apiUrlForms}/${formId}`, form);
  }

  deleteFormById(formId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlForms}/${formId}`);
  }
}
