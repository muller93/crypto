import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorMessageModule } from '../error-message/error-message.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    MatTableModule,
    CommonModule,
    MatProgressSpinnerModule,
    ErrorMessageModule,
  ],
  exports: [ListComponent],
})
export class ListModule {}
