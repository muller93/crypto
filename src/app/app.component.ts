import { Component, OnInit } from '@angular/core';
import { tabs } from './mock/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit(): void {
    const jsonData = JSON.stringify(tabs);
   // localStorage.setItem('tabs', jsonData);
    this.isLoggedIn = localStorage.getItem('loginData') !== null;

  }

  setLogin(event: boolean) {
    this.isLoggedIn = event;
  }
}
