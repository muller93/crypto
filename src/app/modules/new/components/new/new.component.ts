import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CryptoService } from 'src/app/service/crypto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IdName } from 'src/app/model/id-name.inferface';
import { forkJoin } from 'rxjs';
import { CryptoDetails } from 'src/app/model/crypto-details.interface';

@UntilDestroy()
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [CryptoService],
})
export class NewComponent implements OnInit {
  cryptos: CryptoDetails[];
  selectedCrypto: CryptoDetails;

  constructor(
    public dialogRef: MatDialogRef<NewComponent>,
    private _cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._cryptoService.getAllCrypto(),
      this._cryptoService.getTabs(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([cryptos, tabs]) => {
        this.cryptos = cryptos
          .filter(
            (x) =>
              !tabs.some((y) => y.name === x.name) && x.type_is_crypto === 1
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
