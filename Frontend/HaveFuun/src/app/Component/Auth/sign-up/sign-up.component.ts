import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserWithCcg } from '../../../Models/userModel';
import { UsersServiceService } from '../../../Services/Api/users-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements AfterViewInit {

  @Output() displaySignUpChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('containerSignUp', { static: true }) container!: ElementRef;
  @ViewChild('modalSignUp', { static: true }) modal!: ElementRef;

  signUpForm!: FormGroup;
  sendMessage: string = "";
  messageBool: boolean = true;
  account!: UserWithCcg;
  imageArray: string[] = ['assets/public/bishop.webp', 'assets/public/rook.webp', 'assets/public/knight.webp', 'assets/public/queen.webp', 'assets/public/king.webp']
  imageAvatar: string = '';

  verifyArray = {
    min: false,
    upper: false,
    lower: false,
    num: false,
    special: false,
    confirmPass: false
  }

  constructor(
    private formBuilder: FormBuilder, private uS: UsersServiceService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.initInscription();
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.addEventListener('click', (event: any) => {
      if (!this.container.nativeElement.contains(event.target)) {
        this.stopDisplay();
      }
    });
  }
  checkPassword(): void {
    let password = this.signUpForm.get('password')!.value;
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
      special: hasSpecialChar,
      confirmPass: false
    }
  }
  checkConfirmPassword(): void {
    let password = this.signUpForm.get('password')!.value, cPassword = this.signUpForm.get('confirmPassword')!.value;
    (password === this.signUpForm.get('confirmPassword')!.value && password !== "") ? this.verifyArray.confirmPass = true : this.verifyArray.confirmPass = false;
  }
  selectAvatar(avatar: string) {
    this.signUpForm.patchValue({ "avatar": avatar });
    this.imageAvatar === avatar ? this.imageAvatar = "" : this.imageAvatar = avatar
  }

  startDisplaySignUp(): void {
    this.displaySignUpChange.emit(true);
  }

  stopDisplay(): void {
    this.displaySignUpChange.emit(false)
  }
  initInscription(): void {
    this.signUpForm = this.formBuilder.group({
      avatar: ["", Validators.required],
      pseudo: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      newlestter: [false],
      ccg: [false, Validators.required],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{12,}$/)]],
      confirmPassword: ["", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{12,}$/)]]
    })
  }
  onSubmit(): void {
    if (this.signUpForm.get('ccg')!.value === "true") {
      if (this.signUpForm.get("password")?.value != this.signUpForm.get("confirmPassword")?.value) {
        this.sendMessage = "Mot de passe non correspondant";
        this.messageBool = false;
      } else if (this.signUpForm.valid) {
        this.sendMessage = "";
        let account = this.createUser();
        this.uS.addUser(account).subscribe((data) => {
          this.stopDisplay();
          this.router.navigate(['home']);
        }, (error) => {
          if (error.status === 201) {
            this.sendMessage = "Votre compte est créée, connectez-vous maintenant";
            this.messageBool = true
          } else if (error.status === 409) {
            this.sendMessage = "E-mail déjà utilisé";
            this.messageBool = false
          } else if (error.status === 400) {
            this.sendMessage = "Mot de passe invalide";
            this.messageBool = false
          }

        })
      } else {
        this.sendMessage = "Tout les champs ne sont pas remplis"
        this.messageBool = false
      }
    } else {
      this.sendMessage = "Les CGU n'ont pas été remplis"
      this.messageBool = false;
    }
    setTimeout(() => {
      this.sendMessage = ""
      this.initInscription()
    }, 2500)
  }

  createUser(): UserWithCcg {
    let obj: UserWithCcg = {
      pseudo: this.signUpForm.get('pseudo')!.value,
      email: this.signUpForm.get('email')!.value,
      password: this.signUpForm.get('password')!.value,
      avatar: this.signUpForm.get('avatar')!.value,
      hasAcceptedTerms: this.signUpForm.get('ccg')!.value
    }
    return obj
  }



}