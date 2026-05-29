import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { authGuard } from './gaurds/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentSuccessComponent }
from './pages/payment-success/payment-success.component';

import { OrdersComponent }
from './pages/orders/orders.component';
import { AddressComponent } from './pages/address/address.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'products',
    component: ProductsComponent,
  },

  {
    path: 'cart',

    component: CartComponent,

    canActivate: [authGuard],
  },
  {
    path: 'success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'orders',

    component: OrdersComponent,

    canActivate: [authGuard],
  },
  {
    path: 'list',
    component: AddressComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
];
