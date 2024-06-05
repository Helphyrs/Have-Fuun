import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../Models/commentModel';
import { Article } from '../../Models/articleModel';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  apiUrlAdmin: string = environment.apiUrlAdmin;

  // Article

  getAllArticleAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/articles/all/`)
  }
  addArticle(article: Article): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', article.name);
    formData.append('description', article.description);
    formData.append('tags', article.tags);
    if (article.avatar) {
      formData.append('avatar', article.avatar);
    }
    return this.http.post<any>(`${this.apiUrlAdmin}/articles/`, formData)
  }
  editArticleById(article: Article, articleId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlAdmin}/articles/${articleId}`, article)
  }
  deleteArticleById(articleId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlAdmin}/articles/${articleId}`)
  }

  // Comment

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrlAdmin}/comments/all/`)
  }
  deleteCommentById(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlAdmin}/comments/${commentId}`)
  }


  // Forms

  getAllFormsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/forms/all/`)
  }
  addForm(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/forms/`, form);
  }
  editFormById(formId: number, form: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlAdmin}/forms/${formId}`, form);
  }
  deleteFormById(formId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlAdmin}/forms/${formId}`);
  }


  // Users

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/users/all/`)
  }
  getUserByIdAdmin(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/users/user/${userId}`)
  }
  getAllUserInfoAdmin(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/users/user/all/${userId}`)
  }
  isAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/users/isAdmin/`)
  }
  deleteUserByIdAdmin(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlAdmin}/users/delete/${userId}`)
  }


}
