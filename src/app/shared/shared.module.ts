import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';



@NgModule({
  declarations: [
    SideBarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ SideBarComponent,
    LazyImageComponent
   ]
})
export class SharedModule { }
