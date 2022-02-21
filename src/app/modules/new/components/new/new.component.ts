import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CryptoService } from 'src/app/service/crypto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin, startWith } from 'rxjs';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';

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

  constructor(
    public dialogRef: MatDialogRef<NewComponent>,
    private _cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._cryptoService.getAllCrypto(),
      this._cryptoService.getTabs().pipe(startWith([])),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([cryptos, tabs]) => {
        console.log('cryptos', cryptos);
        this.cryptos = cryptos
          .filter((x) => x.type_is_crypto === 1)
          .sort((a, b) => a.name.localeCompare(b.name));
      });
  }

  /*   (!tabs.some((y) => y.name === x.name) || TODO később megnézni
                tabs.some(
                  (y) =>
                    y.userName !==
                    this._cryptoService.getLoggedInUser().userName
                )) && */

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
