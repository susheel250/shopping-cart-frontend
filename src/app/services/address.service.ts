import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  apiUrl = 'http://localhost:5000/api/address';

  constructor(private http: HttpClient) {}

  addAddress(data: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/create`, data, { headers });
  }

  getMyAddresses() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/list`, { headers });
  }

  setDefaultAddress(addressId: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(
      `${this.apiUrl}/set-default/${addressId}`,

      {},

      { headers },
    );
  }
}
