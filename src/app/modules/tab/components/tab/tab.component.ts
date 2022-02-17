import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { switchMap, catchError, of, BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CryptoService } from 'src/app/service/crypto.service';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from 'src/app/modules/new/components/new/new.component';
import { IdName } from 'src/app/model/id-name.inferface';

@UntilDestroy()
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  providers: [CryptoService],
})
export class TabComponent implements OnInit, AfterViewInit {
  error: string;
  tabs: IdName[];
  selectedTabName: string;
  @ViewChild('tab') tab;
  @Output() setLogin = new EventEmitter<boolean>();

  private _refreshList$ = new BehaviorSubject<void>(null);

  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.selectedTabName = this.tab.textLabel;
  }

  public tabChanged(tabChangeEvent): void {
    this.selectedTabName = tabChangeEvent.tab.textLabel ?? null;
  }

  ngOnInit(): void {
    this._refreshList$
      .pipe(
        switchMap(() =>
          this._cryptoService.getTabs().pipe(
            catchError((err) => {
              this.error = err;
              return of<IdName[]>([]);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe((tabs: IdName[]) => (this.tabs = tabs));
  }

  addNew() {
    const dialogRef = this._dialog.open(NewComponent);
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this._cryptoService.addTab(result.data);
        this._refreshList$.next();
      });
  }

  deleteTab() {
    this._cryptoService.deleteTab(this.selectedTabName);
    this._refreshList$.next();
  }
}
