import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../Models/commentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {

  constructor(private http: HttpClient) { }
  apiUrlComment: string = environment.apiUrlComments;

  getCommentsByArticle(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrlComment}/${articleId}`)
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.apiUrlComment}/`, { comment })
  }

  editComment(comment: Comment, commentId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlComment}/${commentId}`, { comment })
  }
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlComment}/${commentId}`)
  }
  getCommentsByUser(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrlComment}/comment/${userId}`)
  }

  deleteCommentByAdmin(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlComment}/admin/${commentId}`)
  }
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrlComment}/admin/all`)
  }
}
