import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/core/service/auth.service';
import { isPresent } from 'src/app/utils/is-present';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent {
  @Output() setLogin = new EventEmitter<boolean>();

  showPasswordError: boolean;

  userNameControl = new FormControl(null, Validators.required);
  passwordControl = new FormControl(null, Validators.required);
  form = new FormGroup({
    userName: this.userNameControl,
    password: this.passwordControl,
  });

  constructor(private _authService: AuthService) {}

  login() {
    this.showPasswordError = false;
    if (this.form.valid) {
      this._authService
        .getUsers()
        .pipe(untilDestroyed(this))
        .subscribe((users) => {
          const registeredUser = users?.find(
            (user) => user.userName === this.userNameControl.value
          );
          if (isPresent(registeredUser)) {
            if (registeredUser.password === this.passwordControl.value) {
              this._authService.setLoggedInUser(registeredUser);
              this.setLogin.emit(true);
            } else {
              this.showPasswordError = true;
            }
          } else {
            const stringifiedUsers = JSON.stringify([
              ...(users ?? []),
              this.form.value,
            ]);
            this._authService.setUsers(stringifiedUsers);
            this._authService.setLoggedInUser(this.form.value);
            this.setLogin.emit(true);
          }
        });
    }
    this.showPasswordError = true;
  }
}
