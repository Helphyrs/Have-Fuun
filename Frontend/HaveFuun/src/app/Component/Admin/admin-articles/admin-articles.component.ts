import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrl: './admin-articles.component.scss'
})
export class AdminArticlesComponent implements OnInit {
  data!: Observable<any>

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['adminArticles']));
    this.data.forEach(info => {
      console.log(info)
    });
  }
}
