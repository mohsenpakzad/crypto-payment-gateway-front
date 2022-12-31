import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { IndexComponent } from './pages/index/index.component';

import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PaymentComponent,
    UserDashboardComponent,
    IndexComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
