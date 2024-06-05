import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ArticleAll, ArticleWithComments } from '../../../Models/articleModel';
import { CommentWithUserInfo, Comment } from '../../../Models/commentModel';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsServiceService } from '../../../Services/Api/comments-service.service';
import { TreatmentJwtErrorService } from '../../../Services/Website/treatment-jwt-error.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  data!: Observable<ArticleWithComments>
  article!: ArticleAll;
  comments: CommentWithUserInfo[] = [];
  tags: string[] = []
  commentForm!: FormGroup;
  errorMessage: string = "";
  constructor(
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private cS: CommentsServiceService, private treatmentJWT: TreatmentJwtErrorService
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['articleInfo']));
    this.data.forEach(info => {
      this.article = info.article;
      this.tags = info.article.tags.split(', ');
      this.comments = info.commentInfoByArticle
      this.initForm();
    });
  }

  initForm(): void {
    this.commentForm = this.formBuilder.group({
      comment: ["", Validators.required]
    })
  }

  onSubmit(): void {
    let content = this.commentForm.get('comment')!.value;
    if (content.length > 10) {
      this.errorMessage = "Votre commentaire a bien été envoyée."
      let comment: Comment = {
        articleId: this.article.ID_article,
        content: content
      };
      this.cS.addComment(comment).subscribe((response) => {

      },
        (error) => {
          if ((error.status === 403 && error.error.error === 'Access forbidden token unvalid') || (error.status === 401 && error.error.error === "Access unauthorized")) {
            this.errorMessage = "Votre commentaire ne respecte pas les normes pour l'envoie"
            this.treatmentJWT.handle403Error(error.error.error);
          }
        }
      );
    } else {
      this.errorMessage = "Votre commentaire est inférieur à 10 caractères"
    }
  }
}
