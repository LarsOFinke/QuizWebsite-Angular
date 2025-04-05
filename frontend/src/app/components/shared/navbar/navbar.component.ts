import { Component, OnInit } from '@angular/core';
import { MobileNavbarComponent } from './mobile/mobile-navbar.component';
import { DesktopNavbarComponent } from './desktop/desktop-navbar.component';
import { Router } from '@angular/router';
import { HomeLogoComponent } from './home-logo/home-logo.component';

@Component({
  selector: 'app-navbar',
  imports: [HomeLogoComponent, MobileNavbarComponent, DesktopNavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  header: string = 'TEST';
  path: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to the router events to track the current route
    this.router.events.subscribe((event: any) => {
      // Only proceed when the navigation is 'end'
      if (event?.urlAfterRedirects) {
        this.path = event.urlAfterRedirects.split('/')[1] || ''; // Extract the path part
        this.updateHeaderBasedOnRoute();
      }
    });
  }

  // Method to update the header based on the current path
  private updateHeaderBasedOnRoute() {
    switch (this.path) {
      case '':
        this.header = 'Über mich';
        break;

      case 'projects':
        this.header = 'Projekte';
        break;

      case 'qualifications':
        this.header = 'Qualifikationen';
        break;

      case 'contact':
        this.header = 'Kontakt';
        break;

      case 'impressum':
        this.header = 'Impressum';
        break;

      default:
        this.header = this.path.toUpperCase() || 'UNKNOWN'; // Handle unknown routes
        break;
    }
  }
}
