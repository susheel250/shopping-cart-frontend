import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './address.component.html',

  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  addresses: any[] = [];

  fullName = '';

  mobile = '';

  address = '';

  city = '';

  state = '';

  pincode = '';

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.getAddresses();
  }

  createAddress() {
    // Validation

    if (
      !this.fullName ||
      !this.mobile ||
      !this.address ||
      !this.city ||
      !this.state ||
      !this.pincode
    ) {
      alert('All fields are required');

      return;
    }
    const data = {
      fullName: this.fullName,

      mobile: this.mobile,

      address: this.address,

      city: this.city,

      state: this.state,

      pincode: this.pincode,
    };

    this.addressService.addAddress(data).subscribe({
      next: () => {
        alert('Address Added');

        this.getAddresses();

        this.resetForm();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  getAddresses() {
    this.addressService.getMyAddresses().subscribe({
      next: (response: any) => {
        console.log(response);

        this.addresses = response;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  resetForm() {
    this.fullName = '';

    this.mobile = '';

    this.address = '';

    this.city = '';

    this.state = '';

    this.pincode = '';
  }

  setDefaultAddress(addressId: number) {
    this.addressService.setDefaultAddress(addressId).subscribe({
      next: () => {
        alert('Default Address Updated');

        this.getAddresses();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
