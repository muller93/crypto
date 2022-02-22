import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
})
@UntilDestroy()
export class ExchangeComponent implements OnInit {
  @Input() set setUsdPrice(usdPrice) {
    this.usdPrice = usdPrice;
    this.usdControl.setValue(usdPrice);
  }
  @Input() set setSelectedTabName(value: string) {
    this.selectedTabName = value;
  }
  selectedTabName: string;
  usdPrice: number;

  usdControl = new FormControl();
  cryptoControl = new FormControl();

  ngOnInit(): void {
    this.usdControl.valueChanges.pipe(untilDestroyed(this)).subscribe((usd) => {
      this.cryptoControl.setValue(usd / this.usdPrice, { emitEvent: false });
    });

    this.cryptoControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((cryptoValue) => {
        this.usdControl.setValue(cryptoValue * this.usdPrice, {
          emitEvent: false,
        });
      });
  }
}
