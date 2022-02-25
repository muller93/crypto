import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorMessageService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: HttpErrorResponse): void {
    this._snackBar.open(message.error.error, 'X');
  }
}
