import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cryptos } from '../mock/cryptos';
import { CryptoDetails } from '../model/crypto-details.interface';
import { Tab } from '../model/tab.inferface';

@Injectable()
export class CryptoService {
  private _apiKey = 'B282AA63-91E4-417B-8A8F-44C2EE8F075E';
  private _apiUrl = 'https://rest.coinapi.io/v1';

  constructor(private _http: HttpClient) {}

  getAllCrypto(): Observable<CryptoDetails[]> {
    return of(cryptos);
    /*   return this._http.get<CryptoDetails[]>(`${this._apiUrl}/assets`, {
      params: { apikey: this._apiKey },
    }); */
  }

  getTabs(): Observable<CryptoDetails[]> {
    return of(JSON.parse(localStorage.getItem('tabs')));
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  addTab(newTab: Tab) {
    const currentTabs: Tab[] = JSON.parse(localStorage.getItem('tabs'));
    const stringifiedTabs = JSON.stringify([
      ...currentTabs,
      {
        id: currentTabs.length,
        name: newTab.name,
        userName: this.getLoggedInUser().userName,
      },
    ]);
    localStorage.setItem('tabs', stringifiedTabs);
  }

  deleteTab(selectedTabName: string) {
    const currentTabs: Tab[] = JSON.parse(localStorage.getItem('tabs'));
    console.log('curr', currentTabs);
    localStorage.setItem(
      'tabs',
      JSON.stringify(
        currentTabs.filter(
          (value) =>
            value.name !== selectedTabName ||
            value.userName !== this.getLoggedInUser().userName
        )
      )
    );
  }
}
