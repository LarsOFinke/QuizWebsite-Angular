import { Component } from '@angular/core';

@Component({
  selector: 'app-linkedin-logo',
  imports: [],
  templateUrl: './linkedin-logo.component.html',
  styleUrl: './linkedin-logo.component.css',
})
export class LinkedinLogoComponent {
  myLinkedinLink: string =
    'https://www.linkedin.com/in/lars-oliver-finke-35a65a347/';
  linkedinLogoName: string = 'linkedin.png';
}
