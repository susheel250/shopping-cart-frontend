import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';

import { OrderService } from '../../services/order.service';

import { PaymentService } from '../../services/payment.service';

import { AddressService } from '../../services/address.service';

import { environment } from '../../../environments/environment';

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

  selectedAddressId: number | null = null;

  selectedAddress: any = null;

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
        this.cartService.getCartCount().subscribe((response: any) => {
          this.cartService.setCartCount(response.count);
        });
        this.getCartItems();
      },

      error: (error) => {
        console.log(error);

        alert('Remove Failed');
      },
    });
  }

  getAddresses() {
    this.addressService.getMyAddresses().subscribe({
      next: (response: any) => {
        this.addresses = response;

        const defaultAddress = this.addresses.find(
          (item: any) => item.isDefault === true,
        );

        if (defaultAddress) {
          this.defaultAddress = defaultAddress;

          this.selectedAddressId = defaultAddress.id;

          this.selectedAddress = defaultAddress;
        }
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  onAddressChange(): void {
    this.selectedAddress = this.addresses.find(
      (item: any) => item.id == this.selectedAddressId,
    );
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Cart is empty');

      return;
    }

    if (!this.selectedAddressId) {
      alert('Please select a shipping address');

      return;
    }

    console.log('Selected Address:', this.selectedAddressId);

    this.orderService.createOrder().subscribe({
      next: () => {
        this.paymentService.createCheckoutSession().subscribe({
          next: (response: any) => {
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

  getImageUrl(image: string): string {
    return `${environment.apiUrl}/uploads/${image}`;
  }
}

