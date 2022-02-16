import { Component, OnInit } from '@angular/core';
import { cryptos } from 'src/app/mock/cryptos';
import { IIdName } from 'src/app/model/id-name.inferface';
import { MatDialogRef } from '@angular/material/dialog';
import { tabs } from 'src/app/mock/tabs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  cryptos: IIdName[] = cryptos.filter((x) => !tabs.some((y) => y.id === x.id));
  selectedCrypto: IIdName;

  constructor(public dialogRef: MatDialogRef<NewComponent>) {}

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
