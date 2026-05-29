import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule}
from '@angular/common';

import { ProductService }
from '../../services/product.service';

import { CartService }
from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({

  selector: 'app-products',

  standalone: true,

  imports: [CommonModule,RouterLink],

  templateUrl:
    './products.component.html',

  styleUrl:
    './products.component.css'

})

export class ProductsComponent
implements OnInit {

  products: any[] = [];

  constructor(
    private productService:
    ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.getProducts();

  }

  getProducts() {

    this.productService
      .getProducts()
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.products = response;

        },

        error: (error) => {

          console.log(error);

        }

      });

  }


  addToCart(productId: number) {

  const data = {

    productId,

    quantity: 1

  };

  this.cartService
    .addToCart(data)
    .subscribe({

      next: (response) => {
        this.cartService.getCartCount().subscribe((response: any) => {
          this.cartService.setCartCount(response.count);
        });
        console.log(response);

        alert('Added To Cart');

      },

      error: (error) => {

        console.log(error);

        alert('Add To Cart Failed');

      }

    });

}

}


