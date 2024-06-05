import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticleAll } from '../../Models/articleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticlesServiceService {

  constructor(private http: HttpClient) { }

  apiUrlArticle: string = environment.apiUrlArticles;

  getAllArticles(): Observable<ArticleAll[]> {
    return this.http.get<ArticleAll[]>(`${this.apiUrlArticle}/all`)
  }
  getArticleById(articleId: number): Observable<ArticleAll> {
    return this.http.get<ArticleAll>(`${this.apiUrlArticle}/article/${articleId}`)
  }
  getAllArticleInfoByName(name: string): Observable<ArticleAll> {
    return this.http.get<ArticleAll>(`${this.apiUrlArticle}/name/${name}`)
  }

}
