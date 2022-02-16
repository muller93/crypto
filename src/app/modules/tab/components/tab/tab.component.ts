import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { switchMap, catchError, of, BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CryptoService } from 'src/app/service/crypto.service';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from 'src/app/modules/new/components/new/new.component';
import { IIdName } from 'src/app/model/id-name.inferface';
import { addTab, deleteTab } from 'src/app/mock/tabs';

@UntilDestroy()
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  providers: [CryptoService],
})
export class TabComponent implements OnInit, AfterViewInit {
  error: string;
  tabs: IIdName[];
  selectedTabName: string;
  @ViewChild('tab') tab;

  private _refreshList$ = new BehaviorSubject<void>(null);

  constructor(
    private _cryptoService: CryptoService,
    private _dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.selectedTabName = this.tab.textLabel;
  }

  public tabChanged(tabChangeEvent): void {
    this.selectedTabName = tabChangeEvent.tab.textLabel;
  }

  ngOnInit(): void {
    this._refreshList$
      .pipe(
        switchMap(() =>
          this._cryptoService.getTabs().pipe(
            catchError((err) => {
              this.error = err;
              return of<IIdName[]>([]);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe((tabs: IIdName[]) => (this.tabs = tabs));
  }

  addNew() {
    const dialogRef = this._dialog.open(NewComponent);
    dialogRef.afterClosed().subscribe((result) => {
      addTab(result.data);
      this._refreshList$.next();
    });
  }

  deleteCrypto() {
    deleteTab(this.selectedTabName);
    this._refreshList$.next();
  }
}
