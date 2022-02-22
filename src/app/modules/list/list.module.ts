import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ListComponent],
  imports: [MatTableModule, CommonModule],
  exports: [ListComponent],
})
export class ListModule {}
