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

  articles!: Observable<Article[]>;

  ngOnInit(): void {
    this.articles = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['articles']));
    console.log(this.articles);
  }

}
