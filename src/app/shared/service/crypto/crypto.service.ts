import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CryptoDetail } from 'src/app/model/crypto-details.interface';
import { GetChart } from 'src/app/model/get-chart.interface';
import { Tab } from 'src/app/model/tab.inferface';
import { User } from 'src/app/model/user.interface';
import { convertDateToString } from 'src/app/utils/date-ot-string';
import { environment } from 'src/environments/environment';
@Injectable()
export class CryptoService {
  connection$: WebSocketSubject<any>;

  constructor(private _http: HttpClient) {}

  connect(tabs: string[]): Observable<any> {
    if (!this.connection$) {
      this.connection$ = webSocket('wss://ws-sandbox.coinapi.io/v1/');
    }
    this._send(tabs);
    return this.connection$;
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
    return this._http.get<CryptoDetail[]>(`${environment.apiUrl}/assets`);
  }

  getTabs(): Observable<Tab[]> {
    return of(this._getTabs());
  }

  private _getTabs(): Tab[] {
    return JSON.parse(localStorage.getItem('tabs'))?.filter(
      (tab) => tab.userName === this.getLoggedInUser().userName
    );
  }

  getCryptoDetails(assetIds: string[]): Observable<CryptoDetail[]> {
    // return of(cryptos);
    return this._http.get<CryptoDetail[]>(`${environment.apiUrl}/assets/`, {
      params: { filter_asset_id: assetIds?.join() },
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
      )}&time_end=${convertDateToString(today)}`
    );
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  addTab(newTab: Tab): void {
    const currentTabs = [
      ...(this._getTabs() ?? []),
      {
        ...newTab,
        userName: this.getLoggedInUser().userName,
      },
    ];
    const stringifiedTabs = JSON.stringify(currentTabs);
    localStorage.setItem('tabs', stringifiedTabs);
  }

  deleteTab(selectedTabName: string): void {
    localStorage.setItem(
      'tabs',
      JSON.stringify(
        this._getTabs().filter(
          (value) =>
            value.asset_id !== selectedTabName ||
            value.userName !== this.getLoggedInUser().userName
        )
      )
    );
  }
}
