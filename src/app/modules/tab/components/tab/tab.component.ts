import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { switchMap, catchError, of, BehaviorSubject, tap, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CryptoService } from 'src/app/service/crypto.service';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from 'src/app/modules/new/components/new/new.component';
import { Tab } from 'src/app/model/tab.inferface';
import { isPresent } from 'src/app/utils/is-present';
import { Chart } from 'src/app/model/chart.interface';

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

  error: string;
  tabs: Tab[];
  selectedTabName$ = new BehaviorSubject<string>(null);
  loggedInUserName: string;
  cryptoDetail: Chart[];

  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.selectedTabName$.next(this.tab?.textLabel);
  }

  public tabChanged(tabChangeEvent): void {
   this.selectedTabName$.next(tabChangeEvent?.tab.textLabel);
  }

  ngOnInit(): void {
    this.loggedInUserName = JSON.parse(
      localStorage.getItem('loggedInUser')
    ).userName;
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
      .subscribe((tabs: Tab[]) => (this.tabs = tabs));

    this.selectedTabName$
      .pipe(
        filter((x) => isPresent(x) && x !== ''),
        untilDestroyed(this)
      )
      .subscribe((tabName) => {
        this._cryptoService
          .getCryptoChart(tabName)
          .pipe(untilDestroyed(this))
          .subscribe((cryptoDetail) => {
            console.log('crdet', cryptoDetail);
            this.cryptoDetail = cryptoDetail.map((detail) => ({
              name: new Date(detail.time_period_end),
              value: detail.price_close,
            }));
          });
      });
  }

  addNew() {
    const dialogRef = this._dialog.open(NewComponent);
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) this._cryptoService.addTab(result.data);
        this._refreshList$.next();
      });
  }

  deleteTab() {
    this._cryptoService.deleteTab(this.selectedTabName$.value);
    this._refreshList$.next();
  }
}
