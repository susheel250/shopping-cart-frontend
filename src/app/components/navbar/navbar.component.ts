import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { CartService }
from '../../services/cart.service';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService }
from '../../services/auth.service';

@Component({

  selector: 'app-navbar',

  standalone: true,

  imports: [RouterLink, CommonModule],

  templateUrl:
    './navbar.component.html',

  styleUrl:
    './navbar.component.css'

})

export class NavbarComponent {
  cartCount = 0;
  ngOnInit(): void {

  this.loadCartCount();

  this.cartService.cartCount$
    .subscribe(count => {

      this.cartCount = count;

    });

}

  constructor(

    public authService:
    AuthService,
    public cartService: CartService,

    private router: Router

  ) {}

  logout() {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);

  }

  loadCartCount(): void {

  this.cartService.getCartCount()
    .subscribe((response: any) => {

      this.cartService.setCartCount(
        response.count
      );

    });

}

}