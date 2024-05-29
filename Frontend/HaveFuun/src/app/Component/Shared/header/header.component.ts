import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/Api/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  displayLogIn: boolean = false;
  displaySignUp: boolean = false;

  constructor(private aS: AuthServiceService) { }

  ngOnInit(): void {

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
