import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './orders.component.html',

  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (response: any) => {
        console.log(response);

        this.orders = response;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
