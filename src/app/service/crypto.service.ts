import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITab } from '../modules/tab/model/tab.interface';
import { tabs } from '../mock/tabs';

@Injectable()
export class CryptoService {
  constructor(private _http: HttpClient) {}

  getTabs(): Observable<ITab[]> {
    console.log('tabi' + tabs)
    return of(tabs);
  }

/*   getCrypto(id: string): Observable<ICrypto> {}
 */}
