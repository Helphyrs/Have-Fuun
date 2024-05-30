import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Form, FormResult } from '../../../Models/formModel';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsServiceService } from '../../../Services/Api/forms-service.service';
import { TreatmentJwtErrorService } from '../../../Services/Website/treatment-jwt-error.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  data!: Observable<Form>;
  form!: Form;

  formUpResult!: FormGroup

  isVerified: boolean = false;
  questions: string[] = []
  topicA: string[] = []
  topicB: string[] = []
  topicC: string[] = []

  answer: string[] = []
  answerNumber: number[] = []

  constructor(
    private activatedRoute: ActivatedRoute, private fS: FormsServiceService,
    private treatmentJWT: TreatmentJwtErrorService
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['form']));
    this.data.forEach(info => {
      this.form = info
      this.initValue()
    });

  }

  initValue(): void {

    for (const elems of Object.entries(this.form)) {
      switch (elems[0]) {
        case "question":
          for (const value of Object.values(elems[1])) {
            if (typeof value === "string") this.questions.push(value)
          }
          break;
        case "topicA":
          for (const value of Object.values(elems[1])) {
            if (typeof value === "string") this.topicA.push(value)
          }
          break;
        case "topicB":
          for (const value of Object.values(elems[1])) {
            if (typeof value === "string") this.topicB.push(value)
          }
          break;
        case "topicC":
          for (const value of Object.values(elems[1])) {
            if (typeof value === "string") this.topicC.push(value)
          }
          break;

      }
    }

  }

  verifyAnswerLength(): void {
    let value = Object.keys(this.answer);
    value.length === 8 ? this.isVerified = true : this.isVerified = false;
  }
  onSubmit(): void {
    for (let i = 0; i < this.answer.length; i++) {
      if (typeof this.answer[i] === "string") this.answerNumber.push(parseInt(this.answer[i]))
    }
    this.answer = [], this.isVerified = false;

    let resultForm: number = this.answerNumber.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    let formResult: FormResult = {
      formId: this.form.ID_form,
      result: resultForm
    }
    this.fS.addResult(formResult).subscribe((response) => {
      console.log('Réponse reçue :', response);
    },
      (error) => {
        if (error.status === 403 && error.error.error === 'Access forbidden token unvalid') this.treatmentJWT.handle403Error(error.error.error);
      }
    );

  }
}
