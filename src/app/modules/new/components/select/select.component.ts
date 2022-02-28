import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';
import { isString } from 'src/app/utils/is-string';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {
  @Output() selectedCrypto = new EventEmitter<CryptoDetail>();
  @Input() cryptos: CryptoDetail[];

  cryptoControl = new FormControl();
  filteredOptions: Observable<CryptoDetail[]>;

  ngOnInit(): void {
    this.filteredOptions = this.cryptoControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): CryptoDetail[] {
    const filterValue = isString(value) ? value?.toLowerCase() : '';
    return this.cryptos?.filter(
      (option) =>
        option?.asset_id?.toLowerCase()?.includes(filterValue) ||
        option?.name?.toLowerCase()?.includes(filterValue)
    );
  }

  displayFn(crypto: CryptoDetail): string {
    return crypto && crypto.name ? crypto.name : '';
  }

  onSelectionChange(event: CryptoDetail): void {
    this.selectedCrypto.emit(event);
  }
}
