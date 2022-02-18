import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { switchMap, catchError, of, BehaviorSubject, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CryptoService } from 'src/app/service/crypto.service';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from 'src/app/modules/new/components/new/new.component';
import { Tab } from 'src/app/model/tab.inferface';

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
  selectedTabName: string;
  loggedInUserName: string;

  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    console.log(' this.tab', this.tab);
    this.selectedTabName = this.tab?.textLabel;
  }

  public tabChanged(tabChangeEvent): void {
    this.selectedTabName = tabChangeEvent?.tab.textLabel ?? null;
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
      .subscribe((tabs: Tab[]) => {
        console.log('tab', tabs);
        this.tabs = tabs;
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
    console.log('selectedf', this.selectedTabName);
    this._cryptoService.deleteTab(this.selectedTabName);
    this._refreshList$.next();
  }
}
