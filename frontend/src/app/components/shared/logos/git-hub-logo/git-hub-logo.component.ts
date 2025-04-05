import { Component } from '@angular/core';

@Component({
  selector: 'app-git-hub-logo',
  imports: [],
  templateUrl: './git-hub-logo.component.html',
  styleUrl: './git-hub-logo.component.css',
})
export class GitHubLogoComponent {
  myGitHubLink: string = 'https://github.com/LarsOFinke';
  gitHubLogoName: string = 'github.png';
}
