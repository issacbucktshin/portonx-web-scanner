/* Angular modules */
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular http and Router */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Modules */
import { AppLayoutModule } from './layout/app-layout.module';

/* Services */
import { HelperService } from './general/helper/helper.service';

/* Componenets */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
  ],
  providers: [
    HelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }