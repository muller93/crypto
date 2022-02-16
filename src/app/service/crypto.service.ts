import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IdName } from '../model/id-name.inferface';

@Injectable()
export class CryptoService {
  constructor(private _http: HttpClient) {}

  getTabs(): Observable<IdName[]> {
    return of(JSON.parse(localStorage.getItem('tabs')));
  }

  addTab(newTab: IdName) {
    const currentTabs: IdName[] = JSON.parse(localStorage.getItem('tabs'));
    const stringifiedTabs = JSON.stringify([
      ...currentTabs,
      { id: currentTabs.length, name: newTab.name },
    ]);
    localStorage.setItem('tabs', stringifiedTabs);
  }

  deleteTab(selectedTabName: string) {
    const currentTabs: IdName[] = JSON.parse(localStorage.getItem('tabs'));
    localStorage.setItem(
      'tabs',
      JSON.stringify(
        currentTabs.filter((value) => value.name !== selectedTabName)
      )
    );
  }
}
