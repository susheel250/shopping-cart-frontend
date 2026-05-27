import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { PaymentService }
from '../../services/payment.service';

@Component({

  selector:
    'app-payment-success',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './payment-success.component.html',

  styleUrl:
    './payment-success.component.css'

})

export class PaymentSuccessComponent
implements OnInit {

  payment: any;

  constructor(
    private paymentService:
    PaymentService
  ) {}

  ngOnInit(): void {

    this.getPayment();

  }

  getPayment() {

    this.paymentService
      .getLatestPayment()
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.payment = response;

        },

        error: (error) => {

          console.log(error);

        }

      });

  }

}