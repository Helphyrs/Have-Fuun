import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailerServiceService } from '../../../Services/Api/mailer-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactForm!: FormGroup;
  sendMessage: string = "";
  messageBool: boolean = true;
  constructor(private formBuilder: FormBuilder, private mailS: MailerServiceService) {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      objet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm() {

    if (this.contactForm.valid) {
      let obj = {
        objet: this.contactForm.get('objet')!.value,
        email: this.contactForm.get('email')!.value,
        message: this.contactForm.get('message')!.value
      }

      this.mailS.sendMail(obj).subscribe((data) => {
      }, (error) => {
        if (error.status === 500) {
          this.sendMessage = "Votre mail n'est pas valide"
          this.messageBool = false;
        } else if (error.status === 200) {
          this.sendMessage = "Votre email a bien été envoyée"
          this.messageBool = true;
        }
      })
    } else {
      this.sendMessage = "Vous n'avez pas rempli tout les champs"
      this.messageBool = false;
    }
    this.contactForm.reset();
    setTimeout(() => {
      this.sendMessage = ""
      this.messageBool = true;
    }, 3500);
  }
}
