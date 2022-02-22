import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { switchMap, catchError, of, BehaviorSubject, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CryptoService } from 'src/app/service/crypto.service';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from 'src/app/modules/new/components/new/new.component';
import { Tab } from 'src/app/model/tab.inferface';
import { isPresent } from 'src/app/utils/is-present';
import { Chart } from 'src/app/model/chart.interface';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';

@UntilDestroy()
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  providers: [CryptoService],
})
export class TabComponent implements OnInit, AfterViewInit {
  @ViewChild('tab') tab;
  @Output() setLogin = new EventEmitter<boolean>();
  private _refreshList$ = new BehaviorSubject<void>(null);
  private _refreshDetails$ = new BehaviorSubject<void>(null);

  error: string;
  tabs: Tab[];
  selectedTabName$ = new BehaviorSubject<string>(null);
  selectedTabIndex = 0;
  cryptoChart: Chart[];
  cryptoDetails: CryptoDetail[];
  selectedTabUsdPrice: number;
  loading = true;
  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.selectedTabName$.next(this.tab?.textLabel);
    this._cdr.detectChanges();
  }

  tabChanged(tabChangeEvent): void {
    this.selectedTabName$.next(tabChangeEvent?.tab.textLabel);
    this.selectedTabUsdPrice = this.cryptoDetails.find(
      (x) => x.asset_id === this.selectedTabName$.value
    )?.price_usd;
  }

  ngOnInit(): void {
    this._refreshList$
      .pipe(
        switchMap(() =>
          this._cryptoService.getTabs().pipe(
            catchError((err) => {
              this.error = err;
              return of<Tab[]>([]);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe((tabs) => {
        this.tabs = tabs as Tab[];
        this._cdr.detectChanges();
        this.loading = false;
      });

    this._refreshList$
      .pipe(
        switchMap(() =>
          this._cryptoService
            .getCryptoDetails(this.tabs?.map((tab) => tab.asset_id))
            .pipe(
              catchError((err) => {
                this.error = err;
                return of<Tab[]>([]);
              })
            )
        ),
        untilDestroyed(this)
      )
      .subscribe((cryptoDetails) => {
        this.cryptoDetails = cryptoDetails as CryptoDetail[];
        this.selectedTabUsdPrice = this.cryptoDetails.find(
          (x) => x.asset_id === this.selectedTabName$.value
        )?.price_usd;
        this._cdr.detectChanges();
      });


    this.selectedTabName$
      .pipe(
        filter((x) => isPresent(x) && x !== ''),
        untilDestroyed(this)
      )
      .subscribe((tabName) => {
        this._cryptoService
          .getCryptoChart(tabName)
          .pipe(untilDestroyed(this))
          .subscribe((cryptoChart) => {
            this.cryptoChart = cryptoChart.map((detail) => ({
              name: new Date(detail.time_period_end),
              value: detail.price_close,
            }));
            this._cdr.detectChanges();
          });
      });
  }

  addNew() {
    const dialogRef = this._dialog.open(NewComponent);
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.loading = true;
          this._cryptoService.addTab(result.data);
          this._refreshList$.next();
        }
      });
  }

  deleteTab() {
    this.loading = true;
    this._cryptoService.deleteTab(this.selectedTabName$.value);
    this._refreshList$.next();
    this.selectedTabName$.next(null);
  }
}
