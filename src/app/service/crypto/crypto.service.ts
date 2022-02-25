import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CryptoDetail } from '../../model/crypto-details.interface';
import { Tab } from '../../model/tab.inferface';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { convertDateToString } from '../../utils/date-ot-string';
import { GetChart } from '../../model/get-chart.interface';
import { User } from '../../model/user.interface';
import { environment } from 'src/environments/environment';
@Injectable()
export class CryptoService {
  connection$: WebSocketSubject<any>;

  constructor(private _http: HttpClient) {}

  connect(tabs: string[]): Observable<any> {
    if (this.connection$) {
      this._send(tabs);
      return this.connection$;
    } else {
      this.connection$ = webSocket('wss://ws-sandbox.coinapi.io/v1/');
      this._send(tabs);
      return this.connection$;
    }
  }

  private _send(tabs: string[]): void {
    if (this.connection$) {
      this.connection$.next({
        type: 'hello',
        apikey: environment.apiKey,
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
    // return of(cryptos);
    return this._http.get<CryptoDetail[]>(`${environment.apiUrl}/assets`, {
      params: { apikey: environment.apiKey },
    });
  }

  getTabs(): Observable<CryptoDetail[]> {
    return of(
      JSON.parse(localStorage.getItem('tabs'))?.filter(
        (tab) => tab.userName === this.getLoggedInUser().userName
      )
    );
  }

  getCryptoDetails(assetIds: string[]): Observable<CryptoDetail[]> {
    // return of(cryptos);
    return this._http.get<CryptoDetail[]>(`${environment.apiUrl}/assets/`, {
      params: { apikey: environment.apiKey, filter_asset_id: assetIds?.join() },
    });
  }

  getCryptoChart(cryptoName: string): Observable<GetChart[]> {
    // return of(chartData);
    const today = new Date();
    const from = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return this._http.get<GetChart[]>(
      `${
        environment.apiUrl
      }/ohlcv/BINANCE_SPOT_${cryptoName}_USDT/history?period_id=1DAY&time_start=${convertDateToString(
        from
      )}&time_end=${convertDateToString(today)}`,
      {
        params: { apikey: environment.apiKey },
      }
    );
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  addTab(newTab: Tab): void {
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

  deleteTab(selectedTabName: string): void {
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