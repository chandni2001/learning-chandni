import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrl: './menu-component.component.css'
})
export class MenuComponentComponent {
  items = [
    { title: 'Home', path: '/home' },
    { title: 'About', path: '/about' },
    { title: 'Login', path: '/login' }
  ];

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
