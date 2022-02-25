import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, of } from 'rxjs';
import { List } from 'src/app/model/list.interface';
import { CryptoService } from 'src/app/service/crypto/crypto.service';
import { ErrorMessageService } from 'src/app/service/error-message/error-message.service';
import { isPresent } from 'src/app/utils/is-present';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [ErrorMessageService]
})
export class ListComponent implements OnInit {
  displayedColumns = ['coin', 'price_low', 'price_high'];
  dataSource = new MatTableDataSource<List>([]);
  error: HttpErrorResponse;

  constructor(
    private _cryptoService: CryptoService,
    private _errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this._cryptoService
      .getTabs()
      .pipe(
        untilDestroyed(this),
        catchError((err) => {
          this._errorMessageService.openSnackBar(err);
          return of<List[]>([]);
        })
      )
      .subscribe((tabs) => {
        this.dataSource.data = tabs?.map((tab) => ({
          coin: tab.asset_id,
          price_low: null,
          price_high: null,
        }));
        this._cryptoService.connect(tabs?.map((tab) => tab.asset_id + '/USD'));
      });
    this._cryptoService.connection$
      .pipe(untilDestroyed(this))
      .subscribe((connection) => {
        const coin = connection.symbol_id?.split('_');
        if (isPresent(coin)) {
          this.dataSource.data = this.dataSource.data.map((data) =>
            data.coin === coin[2]
              ? {
                  coin: coin[2],
                  price_low: connection.price_low,
                  price_high: connection.price_high,
                }
              : data
          );
        }
      });
  }
}
