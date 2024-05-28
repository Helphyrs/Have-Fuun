import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../Models/articleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticlesServiceService {

  constructor(private http: HttpClient) { }

  apiUrlArticle: string = environment.apiUrlArticles;

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrlArticle}/all`)
  }
  getArticleById(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrlArticle}/${articleId}`)
  }
  getArticleByName(name: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrlArticle}/${name}`)
  }

  addArticle(article: Article): Observable<any> {
    return this.http.post<any>(`${this.apiUrlArticle}/admin`, { article })
  }
  editArticleById(article: Article, articleId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlArticle}/admin/${articleId}`, { article })
  }
  deleteArticle(articleId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlArticle}/admin/${articleId}`)
  }

}
