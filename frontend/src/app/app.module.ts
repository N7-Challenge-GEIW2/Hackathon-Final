import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UrlComponent } from './url/url.component';
import { EmailComponent } from './email/email.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiserviceComponent } from './apiservice/apiservice.component';
import { AudioComponent } from './audio/audio.component';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UrlComponent,
    EmailComponent,
    NavbarComponent,
    ApiserviceComponent,
    AudioComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
