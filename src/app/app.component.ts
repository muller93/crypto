import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from './core/service/auth.service';
import { isPresent } from './utils/is-present';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private _authSerice: AuthService) {}

  ngOnInit(): void {
    this._authSerice
      .getLoginData()
      .pipe(untilDestroyed(this))
      .subscribe((loginData) => (this.isLoggedIn = isPresent(loginData)));
  }

  setLogin(event: boolean): void {
    this.isLoggedIn = event;
  }
}
