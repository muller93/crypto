import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Output() selectedCrypto = new EventEmitter<CryptoDetail>();
  @Input() cryptos: CryptoDetail[];

  cryptoControl = new FormControl();

  displayFn(crypto: CryptoDetail): string {
    return crypto && crypto.name ? crypto.name : '';
  }

  onSelectionChange(event: CryptoDetail) {
    this.selectedCrypto.emit(event);
  }
}
