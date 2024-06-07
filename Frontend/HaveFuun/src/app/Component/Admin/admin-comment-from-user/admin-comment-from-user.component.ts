import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserWithoutPassword } from '../../../Models/userModel';
import { AdminServiceService } from '../../../Services/Api/admin-service.service';

@Component({
  selector: 'app-admin-comment-from-user',
  templateUrl: './admin-comment-from-user.component.html',
  styleUrl: './admin-comment-from-user.component.scss'
})
export class AdminCommentFromUserComponent implements OnInit {
  data!: Observable<any>

  user!: UserWithoutPassword;
  comments: any;
  forms: any;

  display: string = "home";
  errorMessage: string = "";

  constructor(private activatedRoute: ActivatedRoute, private adminS: AdminServiceService, private router: Router) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['user']));
    this.data.forEach(info => {
      this.user = info.user;
      this.comments = info.comment;
      this.forms = info.formResult;
    });
  }
  deleteComment(commentId: number): void {
    let bool: boolean = confirm("Êtes vous sûr de supprimer ce commentaire ?")
    if (bool) {
      this.adminS.deleteCommentById(commentId).subscribe((response) => {
        alert("Le commentaire a bien été supprimé, lors de la prochaine actualisation il ne sera plus là.")
      }, (error) => {
        if (error.error === "Access forbidden : you cannot delete another admin") {
          alert("Vous ne supprimez pas un commentaire d'administrateur")
        } else {
          alert("Le commentaire de l'utilisateur a bien été supprimé vous le verrez lors de la prochaine actualisation");
          this.router.navigate(["admin"]);
        }
      })

    }
  }

}


