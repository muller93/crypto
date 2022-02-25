import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ListComponent],
  imports: [MatTableModule, CommonModule, MatProgressSpinnerModule],
  exports: [ListComponent],
})
export class ListModule {}
