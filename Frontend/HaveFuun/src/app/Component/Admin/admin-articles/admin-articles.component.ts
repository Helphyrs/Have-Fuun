import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article, ArticleAll } from '../../../Models/articleModel';
import { ArticlesServiceService } from '../../../Services/Api/articles-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private activatedRoute: ActivatedRoute, private aS: ArticlesServiceService,
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
    let bool: boolean = confirm("$Etes vous sûr de supprimer cet article ?")
    if (bool) {
      this.aS.deleteArticle(id).subscribe(data => {
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

  onSubmit(): void {
    let obj: Article = {
      name: this.addArticleForm.get('name')!.value,
      description: this.addArticleForm.get('description')!.value,
      tags: this.addArticleForm.get('tags')!.value,
      avatar: this.addArticleForm.get('avatar')!.value,
    }
    if (obj) {
      this.aS.addArticle(obj).subscribe(data => {

      }, error => {
        alert("L'article a bien été ajouté, actualisé la page pour le voir")
        this.display = "home";
      })
    }
  }
  onSubmitEdit(): void {
    console.log(this.editArticleForm.get('name')!.value, this.editArticleForm.get('name')!.value, this.editArticleForm.get('tags')!.value, this.editArticleForm.get('avatar')!.value)
    let obj: Article = {
      name: this.editArticleForm.get('name')!.value,
      description: this.editArticleForm.get('description')!.value,
      tags: this.editArticleForm.get('tags')!.value,
      avatar: this.editArticleForm.get('avatar')!.value,
    }
    if (obj) {
      this.aS.editArticleById(obj, this.ID_article).subscribe((data) => {
      }, (error) => {
        this.articles[this.editIndex] = {
          ID_article: this.editIndex + 1,
          name: this.editArticleForm.get('name')!.value,
          description: this.editArticleForm.get('description')!.value,
          tags: this.editArticleForm.get('tags')!.value,
          avatar: this.editArticleForm.get('avatar')!.value
        }
        alert('Le formulaire a bien été modifiée');
        this.display = "home"
        this.editIndex = -1;
      })
    }
  }
}
