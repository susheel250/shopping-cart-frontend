import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { CartService }
from '../../services/cart.service';

import { OrderService }
from '../../services/order.service';

import { PaymentService }
from '../../services/payment.service';

import { AddressService }
from '../../services/address.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',

  standalone: true,

  imports: [CommonModule, FormsModule, RouterLink],

  templateUrl: './cart.component.html',

  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  total = 0;
  addresses: any[] = [];
  defaultAddress: any = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private addressService: AddressService,
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getAddresses();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (response: any) => {
        console.log(response);

        this.cartItems = response;

        this.calculateTotal();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateTotal() {
    this.total = 0;

    for (const item of this.cartItems) {
      this.total += item.product.price * item.quantity;
    }
  }

  removeCartItem(cartId: number) {
    this.cartService.removeCartItem(cartId).subscribe({
      next: () => {
        alert('Item Removed');

        // Reload cart
        this.getCartItems();
      },

      error: (error) => {
        console.log(error);

        alert('Remove Failed');
      },
    });
  }

  checkout() {
    // Empty cart validation

    if (this.cartItems.length === 0) {
      alert('Cart is empty');

      return;
    }

    
    // Step 1
    // Create order first

    this.orderService.createOrder().subscribe({
      next: () => {
        // Step 2
        // Create Stripe session

        this.paymentService.createCheckoutSession().subscribe({
          next: (response: any) => {
            // Redirect Stripe

            window.location.href = response.url;
          },

          error: (error) => {
            console.log(error);

            alert('Payment Failed');
          },
        });
      },

      error: (error) => {
        console.log(error);

        alert('Order Failed');
      },
    });
  }

 getAddresses() {

  this.addressService
    .getMyAddresses()
    .subscribe({

      next: (response: any) => {

        this.addresses = response;

        this.defaultAddress =
          this.addresses.find(

            (item: any) =>
              item.isDefault === true

          );

      },

      error: (error) => {

        console.log(error);

      }

    });

}
}