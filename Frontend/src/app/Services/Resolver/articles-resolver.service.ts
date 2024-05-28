import { Injectable } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ArticlesResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
    return this.articleService.getArticles();
  }
}
