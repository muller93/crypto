import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('loginData') !== null;
  }

  setLogin(event: boolean) {
    this.isLoggedIn = event;
  }
}
