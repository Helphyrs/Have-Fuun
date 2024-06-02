import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormsServiceService } from '../../../Services/Api/forms-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../../Models/formModel';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrl: './admin-forms.component.scss'
})
export class AdminFormsComponent implements OnInit {
  data!: Observable<any>
  forms: any;
  display: string = "home";
  errorMessage: string = "";
  editIndex: number = -1;
  ID_forms: number = -1;
  addForm!: FormGroup;
  editForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private fS: FormsServiceService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['adminForms']));
    this.data.forEach(info => {
      console.log(info)
      this.forms = info
      this.initForm()
    });
  }


  initForm(): void {
    this.addForm = this.formBuilder.group({
      name: ["", Validators.required],
      question: ["", Validators.required],
      topicA: ["", Validators.required],
      topicB: ["", Validators.required],
      topicC: ["", Validators.required],
      avatar: ["", Validators.required]

    })

    this.editForm = this.formBuilder.group({
      name: [""],
      question: [""],
      topicA: [""],
      topicB: [""],
      topicC: [""],
      avatar: [""]
    })
  }
  deleteForm(id: number): void {
    let bool: boolean = confirm("$Etes vous sûr de supprimer cet article ?")
    if (bool) {
      this.fS.deleteFormById(id).subscribe(data => {
      }, error => {
        alert("L'article a bien été supprimé, lors de la prochaine actualisation il ne sera plus là.")
      })
    }
  }

  switchDisplay(elem: string, id: number = -1, index: number = -1): void {
    switch (elem) {
      case "home":
        this.display = "home"
        break;
      case "editArticle":
        this.display = "editArticle"
        this.ID_forms = id;
        this.editIndex = index;
        break;
      case "addArticle":
        this.display = "addArticle";
        break;
    }
  }
  onSubmit(): void {
    let obj = {
      name: this.addForm.get('name')!.value,
      question: this.addForm.get('question')!.value,
      topicA: this.addForm.get('topicA')!.value,
      topicB: this.addForm.get('topicB')!.value,
      topicC: this.addForm.get('topicC')!.value,
      avatar: this.addForm.get('avatar')!.value,
    }
    if (obj) {
      this.fS.addForm(obj).subscribe(data => {
      }, error => {
        alert("L'article a bien été ajouté, actualisé la page pour le voir")
        this.display = "home";
      })
    }
  }

  onSubmitEdit(): void {
    let obj = {
      name: this.editForm.get('name')!.value,
      question: this.editForm.get('question')!.value,
      topicA: this.editForm.get('topicA')!.value,
      topicB: this.editForm.get('topicB')!.value,
      topicC: this.editForm.get('topicC')!.value,
      avatar: this.editForm.get('avatar')!.value,
    }
    if (obj) {
      this.fS.editFormById(this.ID_forms, obj).subscribe((data) => {
      }, (error) => {
        this.forms[this.editIndex] = {
          ID_forms: this.editIndex + 1,
          name: this.editForm.get('name')!.value,
          question: this.editForm.get('question')!.value,
          topicA: this.editForm.get('topicA')!.value,
          topicB: this.editForm.get('topicB')!.value,
          topicC: this.editForm.get('topicC')!.value,
          avatar: this.editForm.get('avatar')!.value,
        }
        alert('Le formulaire a bien été modifiée');
        this.display = "home"
        this.editIndex = -1;
      })
    }
  }
}
