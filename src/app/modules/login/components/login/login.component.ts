import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() setLogin = new EventEmitter<boolean>();

  hide = true;
  showPasswordError: boolean;

  userNameControl = new FormControl();
  passwordControl = new FormControl();
  form = new FormGroup({
    userName: this.userNameControl,
    password: this.passwordControl,
  });

  login() {
    const users = JSON.parse(localStorage.getItem('users'));
    const loginUser = users?.find(
      (user) => user.userName === this.userNameControl.value
    );
    if (loginUser) {
      if (loginUser.password === this.passwordControl.value) {
        localStorage.setItem('loggedInUser', JSON.stringify(loginUser));
        this.setLogin.emit(true);
      } else {
        this.showPasswordError = true;
      }
    } else {
      const stringifiedUsers = JSON.stringify(
        users ? [...users, this.form.value] : [this.form.value]
      );
      localStorage.setItem('users', stringifiedUsers);
      localStorage.setItem('loggedInUser', JSON.stringify(this.form.value));
      this.setLogin.emit(true);
    }
  }
}
