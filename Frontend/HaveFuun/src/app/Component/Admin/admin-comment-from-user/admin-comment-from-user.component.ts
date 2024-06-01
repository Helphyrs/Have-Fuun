import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-comment-from-user',
  templateUrl: './admin-comment-from-user.component.html',
  styleUrl: './admin-comment-from-user.component.scss'
})
export class AdminCommentFromUserComponent implements OnInit {
  data!: Observable<any>

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['user']));
    this.data.forEach(info => {
      console.log(info)
    });
  }
}
