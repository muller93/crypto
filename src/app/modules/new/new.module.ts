import { NgModule } from '@angular/core';
import { NewComponent } from './components/new/new.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SelectComponent } from './components/select/select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NewComponent, SelectComponent],
  imports: [
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatAutocompleteModule,
    ScrollingModule,
    SharedModule,
  ],
})
export class NewModule {}
