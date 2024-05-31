import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesServiceService } from '../Api/articles-service.service';
import { Article, ArticleAll } from '../../Models/articleModel';

@Injectable({ providedIn: 'root' })
export class ArticlesResolver implements Resolve<ArticleAll[] | ArticleAll> {

  constructor(private aS: ArticlesServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ArticleAll[] | ArticleAll> {
    let articleName: string = route.params['name']

    return articleName ? this.aS.getAllArticleInfoByName(articleName) : this.aS.getAllArticles()
  }
}
