import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrl: './admin-forms.component.scss'
})
export class AdminFormsComponent implements OnInit {
  data!: Observable<any>

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['adminForms']));
    this.data.forEach(info => {
      console.log(info)
    });
  }
}
