import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) { }

  createOrder() {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/create`, {}, { headers });
  }
}
