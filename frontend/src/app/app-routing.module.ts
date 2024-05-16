import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UrlComponent } from './url/url.component';
import { EmailComponent } from './email/email.component';
const routes: Routes = [
  {path : '', redirectTo: '/home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'url', component: UrlComponent},
  {path : 'email', component: EmailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
