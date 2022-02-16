import { Component, OnInit } from '@angular/core';
import { IdName } from 'src/app/model/id-name.inferface';
import { MatDialogRef } from '@angular/material/dialog';
import { CryptoService } from 'src/app/service/crypto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cryptos } from 'src/app/mock/cryptos';

@UntilDestroy()
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [CryptoService],
})
export class NewComponent implements OnInit {
  cryptos: IdName[] = [];
  selectedCrypto: IdName;

  constructor(
    public dialogRef: MatDialogRef<NewComponent>,
    private _cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this._cryptoService
      .getTabs()
      .pipe(untilDestroyed(this))
      .subscribe(
        (tabs) =>
          (this.cryptos = cryptos
            .filter((x) => !tabs.some((y) => y.name === x.name))
            .sort((a, b) => a.name.localeCompare(b.name)))
      );
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
