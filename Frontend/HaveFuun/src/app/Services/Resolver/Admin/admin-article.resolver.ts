import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesServiceService } from '../../Api/articles-service.service';

@Injectable({ providedIn: 'root' })
export class adminArticleResolver implements Resolve<any> {

  constructor(private aS: ArticlesServiceService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.aS.getAllArticles();
  }
}