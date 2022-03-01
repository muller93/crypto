import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExchangeComponent } from './components/exchange/exchange.component';

@NgModule({
  declarations: [ExchangeComponent],
  exports: [ExchangeComponent],
  imports: [SharedModule],
})
export class ExchangeModule {}
