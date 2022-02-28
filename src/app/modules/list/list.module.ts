import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent],
  imports: [MatTableModule, SharedModule],
  exports: [ListComponent],
})
export class ListModule {}
