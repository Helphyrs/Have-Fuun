import { Component, OnInit } from '@angular/core';
import { TreatmentJwtErrorService } from '../../../Services/Website/treatment-jwt-error.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  displayLogIn: boolean = false;
  displaySignUp: boolean = false;

  constructor(private treatmentJWT: TreatmentJwtErrorService) { }

  ngOnInit(): void {
    this.treatmentJWT.errorMessage$.subscribe(() => {
      this.displayLogIn = true;
    });
  }

  display(event: any): void {
    this.displayLogIn = event.value;
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
}
