import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Form } from '../../../Models/formModel';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) { }
  data!: Observable<Form[]>;
  forms: Form[] = [];
  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['forms']));
    this.data.forEach(info => {
      this.forms = info

    });
    console.log(this.forms);
  }
}
