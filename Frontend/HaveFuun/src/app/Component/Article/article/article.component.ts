import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article, ArticleWithComments } from '../../../Models/articleModel';
import { CommentWithUserInfo } from '../../../Models/commentModel';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  data!: Observable<ArticleWithComments>
  article!: Article;
  comments: CommentWithUserInfo[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['articleInfo']));
    this.data.forEach(info => {
      this.article = info.article;
      this.comments = info.commentInfoByArticle
    });


  }
}
