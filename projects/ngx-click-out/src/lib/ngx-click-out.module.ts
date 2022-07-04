import { NgModule } from '@angular/core';
import { NgxClickOutComponent } from './ngx-click-out.component';
import { ClickOutDirective } from './click-out.directive';



@NgModule({
  declarations: [
    NgxClickOutComponent,
    ClickOutDirective
  ],
  imports: [
  ],
  exports: [
    NgxClickOutComponent
  ]
})
export class NgxClickOutModule { }
