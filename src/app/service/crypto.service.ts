import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tabs } from '../mock/tabs';
import { IIdName } from '../model/id-name.inferface';

@Injectable()
export class CryptoService {
  constructor(private _http: HttpClient) {}

  getTabs(): Observable<IIdName[]> {
    return of(tabs);
  }

  /*   getCrypto(id: string): Observable<ICrypto> {}
   */
}
