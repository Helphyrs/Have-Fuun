import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User, UserWithoutPassword } from '../../Models/userModel';
import { CommentsServiceService } from '../../Services/Api/comments-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentEdit } from '../../Models/commentModel';
import { TreatmentJwtErrorService } from '../../Services/Website/treatment-jwt-error.service';
import { UsersServiceService } from '../../Services/Api/users-service.service';
import { AuthServiceService } from '../../Services/Api/auth-service.service';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {

  data!: Observable<any>;
  user!: UserWithoutPassword;
  comments: any;
  forms: any;

  editForm: number = -1;
  contentCommActual: string = '';
  editIndex: number = -1;
  display: string = "home";
  errorMessage: string = "";
  imageArray: string[] = ['assets/public/bishop.webp', 'assets/public/rook.webp', 'assets/public/knight.webp', 'assets/public/queen.webp', 'assets/public/king.webp'];
  imageAvatar: string = '';

  commentForm!: FormGroup;
  userForm!: FormGroup;
  verifyArray = {
    min: false,
    upper: false,
    lower: false,
    num: false,
    special: false
  }

  constructor(
    private activatedRoute: ActivatedRoute, private cS: CommentsServiceService,
    private formBuilder: FormBuilder, private treatmentJWT: TreatmentJwtErrorService,
    private uS: UsersServiceService, private router: Router,
    private aS: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['user']));
    this.data.forEach(info => {
      this.user = info.user;
      this.comments = info.comment;
      this.forms = info.formResult;
    });
    this.initForm();
  }

  switchDisplay(elem: string, value: number = -1, index: number = -1, contentComm: string = ""): void {
    switch (elem) {
      case 'home':
        this.display = 'home';
        break;
      case 'editComment':
        this.display = 'editComment';
        this.editForm = value;
        this.editIndex = index;
        this.contentCommActual = contentComm;
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
    if (bool) {
      this.cS.deleteComment(commentId).subscribe(data => {
        alert("Le commentaire a bien été supprimé, lors de la prochaine actualisation il ne sera plus là.")
      })
    }
  }

  initForm(): void {
    this.commentForm = this.formBuilder.group({
      comment: ["", Validators.required]
    })

    this.userForm = this.formBuilder.group({
      avatar: ["", Validators.required],
      pseudo: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}$/)],
    })
  }
  selectAvatar(avatar: string): void {
    this.userForm.patchValue({ "avatar": avatar });
    this.imageAvatar === avatar ? this.imageAvatar = "" : this.imageAvatar = avatar
  }
  checkPassword(): void {
    let password = this.userForm.get('password')!.value;
    const minLength: boolean = password.length >= 8;
    const hasUpperCase: boolean = /[A-Z]/.test(password);
    const hasLowerCase: boolean = /[a-z]/.test(password);
    const hasNumber: boolean = /[0-9]/.test(password);
    const hasSpecialChar = /[#!@$%^&*-]/.test(password);

    this.verifyArray = {
      min: minLength,
      upper: hasUpperCase,
      lower: hasLowerCase,
      num: hasNumber,
      special: hasSpecialChar
    }
  }
  onSubmit(): void {
    let content = this.commentForm.get('comment')!.value;
    if (content.length > 10) {
      this.errorMessage = "Votre commentaire a bien été envoyée."
      let comment: CommentEdit = {
        content: content
      };
      this.comments[this.editIndex].content = content
      this.cS.editComment(comment, this.editForm).subscribe((response) => {
      },
        (error) => {
          if (error.status === 403 && error.error.error === 'Access forbidden token unvalid') {
            this.comments[this.editIndex].content = this.contentCommActual;
            this.contentCommActual = "";
            this.errorMessage = "Votre commentaire ne respecte pas les normes pour l'envoie"
            this.treatmentJWT.handle403Error(error.error.error);
          }
        }
      );
    } else {
      this.errorMessage = "Votre commentaire est inférieur à 10 caractères"
    }
  }
  onSubmitUser(): void {
    if (this.userForm.get('password')!.value && this.userForm.get('password')!.value !== "") {
      let obj: User = {
        pseudo: this.userForm.get('pseudo')!.value,
        email: this.userForm.get('email')!.value,
        password: this.userForm.get('password')!.value,
        avatar: this.userForm.get('avatar')!.value,
      }
      this.errorMessage = "Modification du compte avec MDP";
      this.uS.editUserByToken(obj).subscribe((response) => {
      }, (error) => {
        if (error.status === 403 && error.error.error === 'Access forbidden token unvalid') {
          this.errorMessage = "Votre compte n'a pas été modifié"
          this.treatmentJWT.handle403Error(error.error.error);
        }
      })
    } else {
      let objWithoutPassword: UserWithoutPassword = {
        pseudo: this.userForm.get('pseudo')!.value,
        email: this.userForm.get('email')!.value,
        avatar: this.userForm.get('avatar')!.value,
      }
      this.errorMessage = "Modification du compte sans MDP";
      this.uS.editUserByToken(objWithoutPassword).subscribe((response) => {
      }, (error) => {
        if (error.status === 403 && error.error.error === 'Access forbidden token unvalid') {
          this.errorMessage = "Votre compte n'a pas été modifié"
          this.treatmentJWT.handle403Error(error.error.error);
        }
      })

    }
  }
  deleteUser(): void {
    let bool: boolean = confirm('Êtes vous sûr de vouloir supprimer votre compte, tout les commentaires et résultats de formulaires que vous ayez fait seront aussi supprimés')
    if (bool) {
      this.uS.deleteUserByToken().subscribe((data) => {

      }, (error) => {
        if (error.status === 200) {
          this.aS.logout();
          this.router.navigate(['/'])
          alert("Le compte a bien été supprimé, En vous souhaitant une bonne journée ^^")
        }
      })
    }
  }

}
