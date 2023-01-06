import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from './pages/payment/payment.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ChooseCryptoComponent } from './pages/payment/choose-crypto/choose-crypto.component';
import { SubTransactionsComponent } from './pages/payment/sub-transactions/sub-transactions.component';
import { ResultComponent } from './pages/payment/result/result.component';
import { SellerSimComponent } from './pages/seller-sim/seller-sim.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  {
    path: 'payment/:id',
    component: PaymentComponent,
    children: [
      { path: '', redirectTo: 'choose-crypto', pathMatch: 'full' },
      { path: 'choose-crypto', component: ChooseCryptoComponent },
      {
        path: 'sub-transactions/:cryptoId',
        component: SubTransactionsComponent,
      },
      { path: 'result', component: ResultComponent },
    ],
  },
  { path: 'seller-sim', component: SellerSimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
