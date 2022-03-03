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
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from 'src/app/modules/new/components/new/new.component';
import { Tab } from 'src/app/model/tab.inferface';
import { isPresent } from 'src/app/utils/is-present';
import { Chart } from 'src/app/model/chart.interface';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';
import { GetChart } from 'src/app/model/get-chart.interface';
import { ErrorMessageService } from 'src/app/core/service/error-message.service';
import { CryptoService } from 'src/app/shared/service/crypto/crypto.service';
import { AuthService } from 'src/app/core/service/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  providers: [CryptoService, MatDialog, ErrorMessageService],
})
export class TabComponent implements OnInit, AfterViewInit {
  @ViewChild('tab') tab;
  @Output() setLogin = new EventEmitter<boolean>();
  private _refreshList$ = new BehaviorSubject<void>(null);
  selectedTabName$ = new BehaviorSubject<string>(null);

  tabs: Tab[];
  cryptoChart: Chart[];
  cryptoDetails: CryptoDetail[];
  selectedTabUsdPrice: number;
  loading = true;
  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _errorMessageService: ErrorMessageService
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
              this._errorMessageService.openSnackBar(err);
              return of<Tab[]>([]);
            })
          )
        ),
        switchMap((tabs) => {
          this.tabs = tabs as Tab[];
          return this._cryptoService
            .getCryptoDetails(this.tabs?.map((tab) => tab.asset_id))
            .pipe(
              catchError((err) => {
                this._errorMessageService.openSnackBar(err);
                return of<CryptoDetail[]>([]);
              })
            );
        })
      )
      .subscribe((cryptoDetails) => {
        this.cryptoDetails = cryptoDetails;
        this.selectedTabUsdPrice = this.cryptoDetails.find(
          (x) => x.asset_id === this.selectedTabName$.value
        )?.price_usd;
        this._cdr.detectChanges();
        this.loading = false;
      });

    this.selectedTabName$
      .pipe(
        filter((x) => isPresent(x) && x !== ''),
        untilDestroyed(this),
        switchMap((tabName) =>
          this._cryptoService.getCryptoChart(tabName).pipe(
            catchError((err) => {
              this._errorMessageService.openSnackBar(err);
              return of<GetChart[]>([]);
            }),
            untilDestroyed(this)
          )
        )
      )
      .subscribe((cryptoChart: GetChart[]) => {
        this.cryptoChart = cryptoChart.map((detail) => ({
          name: new Date(detail.time_period_end),
          value: detail.price_close,
        }));
        this._cdr.detectChanges();
      });
  }

  addNew(): void {
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

  deleteTab(): void {
    this.loading = true;
    this._cryptoService.deleteTab(this.selectedTabName$.value);
    this._refreshList$.next();
    this.selectedTabName$.next(null);
  }

  logout(): void {
    this._authService.logout();
    this.setLogin.emit(false);
  }
}
