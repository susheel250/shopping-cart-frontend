import { Injectable }
from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  apiUrl =
    'http://localhost:5000/api/cart';

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

}