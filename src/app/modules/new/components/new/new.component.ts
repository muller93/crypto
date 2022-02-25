import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CryptoService } from 'src/app/service/crypto/crypto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, forkJoin, of, startWith } from 'rxjs';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';
import { ErrorMessageService } from 'src/app/service/error-message/error-message.service';
import { Tab } from 'src/app/model/tab.inferface';

@UntilDestroy()
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [CryptoService, ErrorMessageService],
})
export class NewComponent implements OnInit {
  cryptos: CryptoDetail[];
  selectedCrypto: CryptoDetail;

  constructor(
    public dialogRef: MatDialogRef<NewComponent>,
    private _cryptoService: CryptoService,
    private _errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._cryptoService.getAllCrypto().pipe(
        catchError((err) => {
          this._errorMessageService.openSnackBar(err);
          return of<CryptoDetail[]>([]);
        })
      ),
      this._cryptoService.getTabs().pipe(
        startWith([]),
        catchError((err) => {
          this._errorMessageService.openSnackBar(err);
          return of<Tab[]>([]);
        })
      ),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([cryptos, tabs]) => {
        this.cryptos = cryptos
          .filter(
            (crypto) =>
              crypto.type_is_crypto === 1 &&
              !tabs?.some((y) => y.asset_id === crypto.asset_id)
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      });
  }

  save(): void {
    this.dialogRef.close({ data: this.selectedCrypto });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  handleSelectedCrypto(event): void {
    this.selectedCrypto = event.option.value;
  }
}
