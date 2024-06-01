import { Component, OnInit } from '@angular/core';
import { TreatmentJwtErrorService } from '../../../Services/Website/treatment-jwt-error.service';
import { AuthServiceService } from '../../../Services/Api/auth-service.service';
import { LocalStorageService } from '../../../Services/Website/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  displayLogIn: boolean = false;
  displaySignUp: boolean = false;
  isAuth: boolean = false;

  constructor(
    private treatmentJWT: TreatmentJwtErrorService, private aS: AuthServiceService,
    private lS: LocalStorageService, private router: Router
  ) { }

  ngOnInit(): void {
    this.treatmentJWT.errorMessage$.subscribe(() => {
      this.displayLogIn = true;

    });

    this.aS.isAuth$.subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });
  }

  display(event: any): void {
    this.displayLogIn = event.value;
  }
  isAuthToken(event: any): void {
    this.isAuth = event.value
  }
  displayModal(): void {
    this.displayLogIn = true;
  }
  startDisplaySignUp(event: any): void {
    this.displaySignUp = event;
  }
  signUp(): void {
    this.displaySignUp = true;
  }
  logout(): void {
    this.isAuth = false;
    this.lS.clearLocalStorage();
    this.router.navigate(['/'])
  }
}
