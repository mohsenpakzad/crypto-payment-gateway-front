import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChooseCryptoComponent } from './pages/payment/choose-crypto/choose-crypto.component';
import { SubTransactionsComponent } from './pages/payment/sub-transactions/sub-transactions.component';
import { ResultComponent } from './pages/payment/result/result.component';

import { HttpService } from './services/http.service';
import { LocalStorageService } from './services/local-storage.service';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PaymentComponent,
    UserDashboardComponent,
    LandingComponent,
    ChooseCryptoComponent,
    SubTransactionsComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    DividerModule,
    StyleClassModule,
    TableModule,
    MenuModule,
    FormsModule,
    TabMenuModule,
    StepsModule,
    ProgressBarModule,
  ],
  providers: [
    HttpService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
