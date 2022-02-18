import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CryptoDetails } from 'src/app/model/crypto-details.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Output() selectedCrypto = new EventEmitter<CryptoDetails>();
  @Input() cryptos: CryptoDetails[];

  cryptoControl = new FormControl();

  displayFn(crypto: CryptoDetails): string {
    return crypto && crypto.name ? crypto.name : '';
  }

  onSelectionChange(event: CryptoDetails) {
    this.selectedCrypto.emit(event);
  }
}
