import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'http://localhost:5000/api/payment';

  constructor(private http: HttpClient) { }

  createCheckoutSession() {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/create-checkout-session`, {}, { headers });
  }

  getLatestPayment() {

  const token =
    localStorage.getItem('token');

  const headers =
    new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

  return this.http.get(

    `${this.apiUrl}/latest`,

    { headers }

  );

}
}
