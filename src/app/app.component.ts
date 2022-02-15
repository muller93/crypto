import { Component, OnInit } from '@angular/core';
import { switchMap, catchError, of, BehaviorSubject } from 'rxjs';
import { CryptoService } from './service/crypto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ITab } from './modules/tab/model/tab.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CryptoService], // tudom, hogy így roottal is be lehetne húzni, de tegyünk úgy, mintha ez az app egy kisebb része lenne :D
})
export class AppComponent  {
  title = 'crypto';

}
