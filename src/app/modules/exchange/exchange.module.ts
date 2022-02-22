import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExchangeComponent } from './components/exchange/exchange.component';

@NgModule({
  declarations: [ExchangeComponent],
  exports: [ExchangeComponent],
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class ExchangeModule {}
