import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IIdName } from 'src/app/model/id-name.inferface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Output() selectedCrypto = new EventEmitter<IIdName>();
  @Input() cryptos: IIdName[];

  cryptoControl = new FormControl();

  displayFn(crypto: IIdName): string {
    return crypto && crypto.name ? crypto.name : '';
  }

  onSelectionChange(event: IIdName) {
    console.log('event', event)
    this.selectedCrypto.emit(event);
  }
}
