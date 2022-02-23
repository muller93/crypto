import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CryptoService } from 'src/app/service/crypto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, forkJoin, of, startWith } from 'rxjs';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [CryptoService],
})
export class NewComponent implements OnInit {
  cryptos: CryptoDetail[];
  selectedCrypto: CryptoDetail;
  error: HttpErrorResponse;

  constructor(
    public dialogRef: MatDialogRef<NewComponent>,
    private _cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._cryptoService.getAllCrypto().pipe(
        catchError((err) => {
          this.error = err;
          return of<CryptoDetail[]>([]);
        })
      ),
      this._cryptoService.getTabs().pipe(
        startWith([]),
        catchError((err) => {
          this.error = err;
          return of<CryptoDetail[]>([]);
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

  save() {
    this.dialogRef.close({ data: this.selectedCrypto });
  }

  cancel() {
    this.dialogRef.close();
  }

  handleSelectedCrypto(event) {
    this.selectedCrypto = event.option.value;
  }
}
