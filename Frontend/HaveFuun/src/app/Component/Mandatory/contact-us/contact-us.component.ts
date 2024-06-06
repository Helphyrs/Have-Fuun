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
        this.sendMessage = "Votre email a bien été envoyée"
        setTimeout(() => {
          this.sendMessage = ""
        }, 2500);
        this.contactForm.reset()
      }, (error) => {
        this.sendMessage = "Votre mail n'est pas valide"
        setTimeout(() => {
          this.sendMessage = ""
        }, 2500)
      })
      this.contactForm.reset();
    } else {
      this.sendMessage = "Vous n'avez pas rempli tout les champs"
      this.contactForm.reset()
      setTimeout(() => {
        this.sendMessage = ""
      }, 2500);
    }
  }
}
