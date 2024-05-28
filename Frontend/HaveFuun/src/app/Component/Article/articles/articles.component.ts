import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article } from '../../../Models/articleModel';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  data!: Observable<Article[]>;
  articles: Article[] = [];

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['articles']));
    this.data.forEach(info => {
      this.articles = info

    });
    console.log(this.articles);
  }

}
