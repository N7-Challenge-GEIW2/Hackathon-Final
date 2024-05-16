import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UrlComponent } from './url/url.component';
import { EmailComponent } from './email/email.component';
import { AudioComponent } from './audio/audio.component';
import { PdfComponent } from './pdf/pdf.component';
const routes: Routes = [
  {path : '', redirectTo: '/home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'url', component: UrlComponent},
  {path : 'email', component: EmailComponent},
  {path : 'audio', component: AudioComponent},
  {path : 'pdf', component: PdfComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
