import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() cryptoDetails: CryptoDetail[];
  displayedColumns = ['coin', 'low', 'high'];
  dataSource = new MatTableDataSource<CryptoDetail>([]);
  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.cryptoDetails;
    console.log('list', this.cryptoDetails);
  }
}
