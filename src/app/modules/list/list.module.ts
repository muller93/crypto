import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ListComponent],
  imports: [MatTableModule, CommonModule, MatProgressSpinnerModule, CoreModule],
  exports: [ListComponent],
})
export class ListModule {}
