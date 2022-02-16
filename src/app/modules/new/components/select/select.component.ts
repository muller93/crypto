import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IdName } from 'src/app/model/id-name.inferface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Output() selectedCrypto = new EventEmitter<IdName>();
  @Input() cryptos: IdName[];

  cryptoControl = new FormControl();

  displayFn(crypto: IdName): string {
    return crypto && crypto.name ? crypto.name : '';
  }

  onSelectionChange(event: IdName) {
    this.selectedCrypto.emit(event);
  }
}
