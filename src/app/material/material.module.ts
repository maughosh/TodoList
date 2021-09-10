import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialCopnent=[MatButtonModule,
  MatToolbarModule]


@NgModule({
 
  imports: [MaterialCopnent],
  exports:[MaterialCopnent]
})
export class MaterialModule { }
