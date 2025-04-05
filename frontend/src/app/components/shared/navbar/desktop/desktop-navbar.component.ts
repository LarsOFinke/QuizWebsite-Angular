import { Component } from '@angular/core';
import { NavLinkListComponent } from './nav-link-list/nav-link-list.component';

@Component({
  selector: 'app-desktop-navbar',
  imports: [NavLinkListComponent],
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.css', '../navbar.component.css'],
})
export class DesktopNavbarComponent {}
