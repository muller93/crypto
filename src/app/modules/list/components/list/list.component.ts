import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { List } from 'src/app/model/list.interface';
import { CryptoService } from 'src/app/service/crypto.service';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() cryptoDetails: List[];
  displayedColumns = ['coin', 'price_low', 'price_high'];
  dataSource = new MatTableDataSource<List>([]);
  constructor(private _cryptoService: CryptoService) {}

  ngOnInit(): void {
    this._cryptoService
      .getTabs()
      .pipe(untilDestroyed(this))
      .subscribe((tabs) => {
        this.dataSource.data = tabs?.map((tab) => ({
          coin: tab.asset_id,
          price_low: null,
          price_high: null,
        }));
        this._cryptoService.connect(tabs?.map((tab) => tab.asset_id + '/USD'));
      });
    this._cryptoService.connection$
      .pipe(untilDestroyed(this))
      .subscribe((connection) => {
        const coin = connection.symbol_id.split('_');
        this.dataSource.data = this.dataSource.data.map((data) =>
          data.coin === coin[2]
            ? {
                coin: coin[2],
                price_low: connection.price_low,
                price_high: connection.price_high,
              }
            : data
        );
      });
  }
}
