import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GokComponent } from './gok/gok.component';

import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    GokComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
