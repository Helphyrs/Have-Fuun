import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesServiceService } from '../Api/articles-service.service';
import { Article } from '../../Models/articleModel';

@Injectable({ providedIn: 'root' })
export class ArticlesResolver implements Resolve<Article[] | Article> {

  constructor(private aS: ArticlesServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | Article> {
    let articleName: string = route.params['name']

    return articleName ? this.aS.getAllArticleInfoByName(articleName) : this.aS.getAllArticles()
  }
}
