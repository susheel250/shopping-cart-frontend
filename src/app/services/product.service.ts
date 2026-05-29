import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.apiUrl}/list`);
  }

  // Create product

  createProduct(formData: FormData) {
    return this.http.post(
      `${this.apiUrl}/create`,

      formData,
    );
  }

  // Product details

  getProductDetails(productId: number) {
    return this.http.get(`${this.apiUrl}/id/${productId}`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}