import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ArticleAll } from '../../../Models/articleModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  data!: Observable<ArticleAll[]>;
  articles: ArticleAll[] = [];
  tags: string[][] = [];

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['articles']));
    this.data.forEach(info => {
      this.articles = info
    });

  }

}
