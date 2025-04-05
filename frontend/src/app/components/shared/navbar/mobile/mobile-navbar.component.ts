import { Component } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-mobile-navbar',
  imports: [DropdownComponent],
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css', '../navbar.component.css'],
})
export class MobileNavbarComponent {}
