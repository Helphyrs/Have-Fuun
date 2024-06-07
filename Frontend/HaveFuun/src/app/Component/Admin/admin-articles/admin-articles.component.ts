import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article } from '../../../Models/articleModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../Services/Api/admin-service.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrl: './admin-articles.component.scss'
})
export class AdminArticlesComponent implements OnInit {

  data!: Observable<any>;
  articles: any;
  display: string = "home";
  errorMessage: string = "";
  editIndex: number = -1;
  ID_article: number = -1;
  addArticleForm!: FormGroup;
  editArticleForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, private adminS: AdminServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['adminArticles']));
    this.data.forEach(info => {
      this.articles = info
      this.initForm()
    });
  }

  switchDisplay(elem: string, id: number = -1, index: number = -1): void {
    switch (elem) {
      case "home":
        this.display = "home"
        break;
      case "editArticle":
        this.editArticleForm.patchValue({ 'name': this.articles[index].name })
        this.editArticleForm.patchValue({ 'description': this.articles[index].description })
        this.editArticleForm.patchValue({ 'tags': this.articles[index].tags })
        this.display = "editArticle"
        this.ID_article = id;
        this.editIndex = index;
        break;
      case "addArticle":
        this.display = "addArticle";
        break;
    }
  }
  deleteArticle(id: number): void {
    let bool: boolean = confirm("Etes vous sûr de supprimer cet article ?")
    if (bool) {
      this.adminS.deleteArticleById(id).subscribe(data => {
      }, error => {
        alert("L'article a bien été supprimé, lors de la prochaine actualisation il ne sera plus là.")
      })
    }
  }
  initForm(): void {
    this.addArticleForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      tags: ["", Validators.required],
      avatar: ["", Validators.required]

    })

    this.editArticleForm = this.formBuilder.group({
      name: [""],
      description: [""],
      tags: [""],
      avatar: [""]
    })
  }

  onFileChange(event: any, elem: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (elem === 'add') {
        this.addArticleForm.patchValue({
          avatar: file
        });
      } else if (elem === 'edit') {
        this.editArticleForm.patchValue({
          avatar: file
        });
      }
    }
  }

  onSubmit(): void {
    let obj: Article = {
      name: this.addArticleForm.get('name')!.value,
      description: this.addArticleForm.get('description')!.value,
      tags: this.addArticleForm.get('tags')!.value,
      avatar: this.addArticleForm.get('avatar')!.value,
    }
    if (obj) {
      this.adminS.addArticle(obj).subscribe(data => {

      }, error => {
        this.initForm()
        alert("L'article a bien été ajouté, actualisé la page pour le voir")
        this.display = "home";
      })
    }
  }
  onSubmitEdit(): void {
    let obj: Article = {
      name: this.editArticleForm.get('name')!.value,
      description: this.editArticleForm.get('description')!.value,
      tags: this.editArticleForm.get('tags')!.value,
      avatar: this.editArticleForm.get('avatar')!.value,
    }
    if (obj) {
      this.adminS.editArticleById(obj, this.ID_article).subscribe((data) => {
      }, (error) => {
        this.initForm()
        alert(" L'article a bien été modifiée, actualisé la page pour le voir");
        this.display = "home"
        this.editIndex = -1;
      })
    }
  }
}
