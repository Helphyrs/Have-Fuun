import { Component, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/Api/auth-service.service';
import { Login } from '../../../Models/userModel';
import { LocalStorageService } from '../../../Services/Website/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  @Output() displaySignInChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() displaySignUpChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('modal', { static: true }) modal!: ElementRef;

  constructor(
    private formBuilder: FormBuilder, private aS: AuthServiceService,
    private router: Router, private lS: LocalStorageService
  ) { }

  signInForm!: FormGroup;
  errorMessage: string = "";

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.modal.nativeElement.addEventListener('click', (event: any) => {
      if (!this.container.nativeElement.contains(event.target)) {
        this.stopDisplay();
      }
    });
  }

  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit(): void {
    const email = this.signInForm.get("email")?.value;
    const password = this.signInForm.get("password")?.value;

    let login: Login = {
      email: email,
      password: password
    }
    this.lS.clearLocalStorage();
    this.aS.login(login).subscribe((data) => {
      this.lS.setLocalStorage("token", data.token);
      this.aS.isAuth.next(true);
      this.stopDisplay();
    }, (error) => {
      this.errorMessage = "Informations incorrects"
      setTimeout(() => this.errorMessage = "", 2500)
    })
  }

  stopDisplay(): void {
    this.displaySignInChange.emit(false);
  }
  signUp(): void {
    this.displaySignUpChange.emit(true);
    this.stopDisplay();
  }
}
