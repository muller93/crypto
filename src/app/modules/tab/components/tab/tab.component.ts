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
import { CryptoDetails } from 'src/app/model/crypto-details.interface';

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
  cryptoDetail: CryptoDetails;

  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.selectedTabName$.next(this.tab?.textLabel);
  }

  public tabChanged(tabChangeEvent): void {
    this.selectedTabName$.next(tabChangeEvent?.tab.textLabel ?? null);
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
        filter((x) => x !== null),
        untilDestroyed(this)
      )
      .subscribe((x) => {
        this._cryptoService
          .getCryptoDetail(this.tabs?.find((tab) => tab.name === x).asset_id)
          .pipe(untilDestroyed(this))
          .subscribe((cryptoDetail) => (this.cryptoDetail = cryptoDetail));
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
