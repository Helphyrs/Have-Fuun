import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserWithoutPassword } from '../../Models/userModel';
import { CommentWithArticleName } from '../../Models/commentModel';
import { FormResultWithFormName } from '../../Models/formModel';
import { CommentsServiceService } from '../../Services/Api/comments-service.service';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {

  data!: Observable<any>;
  user!: UserWithoutPassword;
  comments: any
  forms: any

  display: string = "home";

  constructor(private activatedRoute: ActivatedRoute, private cS: CommentsServiceService) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['user']));
    this.data.forEach(info => {
      this.user = info.user;
      this.comments = info.comment;
      this.forms = info.formResult;
      console.log(this.comments)
    });
  }

  switchDisplay(elem: string, value: number): void {
    switch (elem) {
      case 'home':
        this.display = 'home';
        break;
      case 'editComment':
        this.display = 'editComment';
        break;
      case 'deleteComment':
        this.deleteComment(value);
        break;
      case 'editUser':
        this.display = 'editUser';
        break;
    }
  }

  deleteComment(commentId: number): void {
    let bool: boolean = confirm("Êtes vous sûr de supprimer votre commentaire ?")
    console.log(typeof commentId, commentId)
    if (bool) {
      this.cS.deleteComment(commentId).subscribe(data => {
        alert("Le commentaire a bien été supprimé, lors de la prochaine actualisation il ne sera plus là.")
      })
    }
  }
}
