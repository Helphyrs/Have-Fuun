import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AdminServiceService } from '../../../Services/Api/admin-service.service';


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


  addName: string = "";
  addAvatar: string = "";
  addQuestions: string[] = Array(8).fill('');
  addTopicsA: string[] = Array(8).fill('');
  addTopicsB: string[] = Array(8).fill('');
  addTopicsC: string[] = Array(8).fill('');

  editName: string = "";
  editAvatar: string = "";
  editQuestions: string[] = Array(8).fill('');
  editTopicsA: string[] = Array(8).fill('');
  editTopicsB: string[] = Array(8).fill('');
  editTopicsC: string[] = Array(8).fill('');

  constructor(private activatedRoute: ActivatedRoute, private adminS: AdminServiceService) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['adminForms']));
    this.data.forEach(info => {
      this.forms = info
    });
  }

  areAllFieldsFilled(): boolean {
    return this.addQuestions.every(part => part.trim() !== '') &&
      this.addTopicsA.every(part => part.trim() !== '') &&
      this.addTopicsB.every(part => part.trim() !== '') &&
      this.addTopicsC.every(part => part.trim() !== '') &&
      this.addAvatar != "" && this.addName != "";
  }
  areAllEditFieldsFilled(): boolean {
    return this.editQuestions.every(part => part.trim() !== '') &&
      this.editTopicsA.every(part => part.trim() !== '') &&
      this.editTopicsB.every(part => part.trim() !== '') &&
      this.editTopicsC.every(part => part.trim() !== '') &&
      this.editAvatar != "" && this.editName != "";
  }

  deleteForm(id: number): void {
    let bool: boolean = confirm("Etes vous sûr de supprimer ce formulaire ?")
    if (bool) {
      this.adminS.deleteFormById(id).subscribe(data => {
      }, error => {
        alert("Le formulaire a bien été supprimé, lors de la prochaine actualisation il ne sera plus là.")
      })
    }
  }

  switchDisplay(elem: string, id: number = -1, index: number = -1): void {
    switch (elem) {
      case "home":
        this.display = "home"
        break;
      case "editForm":
        this.display = "editForm"
        this.ID_forms = id;
        this.editIndex = index;
        break;
      case "addForm":
        this.display = "addForm";
        break;
    }
  }
  onSubmit(): void {
    if (this.display === "addForm") {
      if (this.areAllFieldsFilled()) {
        let obj = {
          name: this.addName,
          avatar: this.addAvatar,
          questions: this.addQuestions.join(','),
          topicA: this.addTopicsA.join(','),
          topicB: this.addTopicsB.join(','),
          topicC: this.addTopicsC.join(',')


        }

        this.adminS.addForm(obj).subscribe(response => {

        }, error => {
          alert("Le formulaire a bien été ajouté, actualisé la page pour le voir")
          this.display = "home";
          this.addName = "";
          this.addAvatar = "";
          this.addQuestions = Array(8).fill('');
          this.addTopicsA = Array(8).fill('');
          this.addTopicsB = Array(8).fill('');
          this.addTopicsC = Array(8).fill('');
        })
      }
    } else if (this.display === "editForm") {
      if (this.areAllEditFieldsFilled()) {
        let obj = {
          name: this.editName,
          avatar: this.editAvatar,
          questions: this.editQuestions.join(','),
          topicA: this.editTopicsA.join(','),
          topicB: this.editTopicsB.join(','),
          topicC: this.editTopicsC.join(',')
        }

        this.adminS.editFormById(this.ID_forms, obj).subscribe(response => {

        }, error => {
          this.forms[this.editIndex] = {
            ID_form: this.ID_forms,
            name: this.editName,
            question: this.editQuestions,
            avatar: this.editAvatar,
            topicA: this.editTopicsA,
            topicB: this.editTopicsB,
            topicC: this.editTopicsC
          }
          alert("Le formulaire a bien été ajouté, actualisé la page pour le voir")
          this.display = "home";
          this.editName = "";
          this.editAvatar = "";
          this.editQuestions = Array(8).fill('');
          this.editTopicsA = Array(8).fill('');
          this.editTopicsB = Array(8).fill('');
          this.editTopicsC = Array(8).fill('');
        })
      }

    }

  }


}
