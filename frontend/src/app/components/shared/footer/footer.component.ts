import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkedinLogoComponent } from '../logos/linkedin-logo/linkedin-logo.component';
import { GitHubLogoComponent } from '../logos/git-hub-logo/git-hub-logo.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, GitHubLogoComponent, LinkedinLogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
