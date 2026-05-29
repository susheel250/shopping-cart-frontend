import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-detail',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './product-detail.component.html',

  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.getProduct(productId);
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response: any) => {
        this.product = response;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
  getImageUrl(image: string): string {
      return `${environment.apiUrl}/uploads/${image}`;
    }
}
