import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentsServiceService } from '../Api/comments-service.service';
import { Comment } from '../../Models/commentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentsResolverService {

  constructor(private cS: CommentsServiceService) { }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | Article> {
  //   let articleName: string = route.params['name']
  //   return articleName ? this.articlesService.getArticleByName(articleName) : this.articlesService.getAllArticles()
  // }
}
