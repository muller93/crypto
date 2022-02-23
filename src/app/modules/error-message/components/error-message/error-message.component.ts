import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPresent } from 'src/app/utils/is-present';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() set error(error: HttpErrorResponse) {
    if (isPresent(error?.error?.error)) this.openSnackBar(error?.error?.error);
  }
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X');
  }
}
