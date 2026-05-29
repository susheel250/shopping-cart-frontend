import { Injectable }
from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  apiUrl =
    'http://localhost:5000/api/cart';

  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();
  setCartCount(count: number): void { this.cartCountSource.next(count); } 
  getCartCountValue(): number { return this.cartCountSource.value; }

  constructor(
    private http: HttpClient
  ) {}

  addToCart(data: any) {

    const token =
      localStorage.getItem('token');

    const headers =
      new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      });

    return this.http.post(

      `${this.apiUrl}/add`,

      data,

      { headers }

    );

  }

  getCartItems() {

  const token =
    localStorage.getItem('token');

  const headers =
    new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

  return this.http.get(

    `${this.apiUrl}/list`,

    { headers }

  );

}

removeCartItem(cartId: number) {

  const token =
    localStorage.getItem('token');

  const headers =
    new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

  return this.http.delete(

    `${this.apiUrl}/remove/${cartId}`,

    { headers }

  );

}

getCartCount() {

  const token =
    localStorage.getItem('token');

  const headers =
    new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

  return this.http.get(

    `${this.apiUrl}/count`,

    { headers }

  );

}

}