import { Component, Input, OnInit } from '@angular/core';
import { ITab } from '../../model/tab.interface';
import { switchMap, catchError, of, BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CryptoService } from 'src/app/service/crypto.service';

@UntilDestroy()
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  error: string;
  tabs: ITab[];

  private _refreshList$ = new BehaviorSubject<void>(null);

  constructor(private _cryptoService: CryptoService) {}

  ngOnInit(): void {
    this._refreshList$
      .pipe(
        switchMap(() =>
          this._cryptoService.getTabs().pipe(
            catchError((err) => {
              this.error = err;
              return of<ITab[]>([]);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe((tabs: ITab[]) => (this.tabs = tabs));
  }

  addNew() {
    console.log('add');
  }
}
