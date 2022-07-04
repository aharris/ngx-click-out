import { NgModule } from '@angular/core';
import { NgxClickOutsideComponent } from './ngx-click-out.component';
import { ClickOutDirective } from './click-out.directive';



@NgModule({
  declarations: [
    NgxClickOutsideComponent,
    ClickOutDirective
  ],
  imports: [
  ],
  exports: [
    NgxClickOutsideComponent
  ]
})
export class NgxClickOutsideModule { }
