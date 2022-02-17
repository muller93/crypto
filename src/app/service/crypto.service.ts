import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CryptoDetails } from '../model/crypto-details.interface';
import { IdName } from '../model/id-name.inferface';

@Injectable()
export class CryptoService {
  private _apiKey = 'B282AA63-91E4-417B-8A8F-44C2EE8F075E';
  private _apiUrl = 'https://rest.coinapi.io/v1';

  constructor(private _http: HttpClient) {}

  getAllCrypto(): Observable<CryptoDetails> {
    return this._http.get<CryptoDetails>(`${this._apiUrl}/assets`, {
      params: { apikey: this._apiKey },
    });
  }

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
