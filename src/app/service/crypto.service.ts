import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, Observable, of } from 'rxjs';
import { chartData } from '../mock/chart';
import { cryptos } from '../mock/cryptos';
import { CryptoDetail } from '../model/crypto-details.interface';
import { Tab } from '../model/tab.inferface';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable()
export class CryptoService {
  private _apiKey = 'B282AA63-91E4-417B-8A8F-44C2EE8F075E';
  // private _apiKey = 'D04B1E7E-28D2-4762-903B-39410A5AC784';
  private _apiUrl = 'https://rest.coinapi.io/v1';
  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  constructor(private _http: HttpClient) {}

  connect(): Observable<any> {
    if (this.connection$) {
      return this.connection$;
    } else {
      this.connection$ = webSocket('wss://ws-sandbox.coinapi.io/v1/');
      return this.connection$;
    }
  }

  send(tabs: string[]) {
    if (this.connection$) {
      this.connection$.next({
        type: 'hello',
        apikey: this._apiKey,
        heartbeat: false,
        subscribe_data_type: ['ohlcv'],
        subscribe_filter_asset_id: tabs,
        subscribe_filter_period_id: ['1MIN'],
      });
    } else {
      console.error('Did not send data, open a connection first');
    }
  }

  getAllCrypto(): Observable<CryptoDetail[]> {
    return of(cryptos);
    /*   return this._http.get<CryptoDetail[]>(`${this._apiUrl}/assets`, {
      params: { apikey: this._apiKey },
    }); */
  }

  getTabs(): Observable<CryptoDetail[]> {
    return of(JSON.parse(localStorage.getItem('tabs')));
  }

  getCryptoDetails(assetIds: string[]): Observable<CryptoDetail[]> {
    return of(cryptos);
    /* return this._http.get<CryptoDetail[]>(`${this._apiUrl}/assets/`, {
      params: { apikey: this._apiKey, filter_asset_id: assetIds.join() },
    }); */
    /* return of(
      JSON.parse(localStorage.getItem('tabs')).filter(
        (tab) => tab.asset_id === assetId
      )
    ); */
  }

  getCryptoChart(cryptoName: string): Observable<any> {
    return of(chartData);
    /* const today = new Date();
    const from = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return this._http.get<any[]>( // TODO any
      `${
        this._apiUrl
      }/ohlcv/BITSTAMP_SPOT_${cryptoName}_USD/history?period_id=1DAY&time_start=${convertDateToString(
        from
      )}&time_end=${convertDateToString(today)}`,
      {
        params: { apikey: this._apiKey },
      }
    ); */
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  addTab(newTab: Tab) {
    const currentTabs: Tab[] = JSON.parse(localStorage.getItem('tabs'));
    const stringifiedTabs = JSON.stringify(
      currentTabs
        ? [
            ...currentTabs,
            {
              asset_id: newTab.asset_id,
              name: newTab.name,
              userName: this.getLoggedInUser().userName,
            },
          ]
        : [
            {
              asset_id: newTab.asset_id,
              name: newTab.name,
              userName: this.getLoggedInUser().userName,
            },
          ]
    );
    localStorage.setItem('tabs', stringifiedTabs);
  }

  deleteTab(selectedTabName: string) {
    const currentTabs: Tab[] = JSON.parse(localStorage.getItem('tabs'));
    localStorage.setItem(
      'tabs',
      JSON.stringify(
        currentTabs.filter(
          (value) =>
            value.asset_id !== selectedTabName ||
            value.userName !== this.getLoggedInUser().userName
        )
      )
    );
  }
}
