import { Component }
from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { AuthService }
from '../../services/auth.service';

@Component({

  selector: 'app-register',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './register.component.html',

  styleUrl: './register.component.css'

})

export class RegisterComponent {

  name = '';

  email = '';

  password = '';

  constructor(
    private authService: AuthService
  ) {}

  register() {

    const data = {

      name: this.name,

      email: this.email,

      password: this.password

    };

    this.authService
      .register(data)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          alert('Register Success');

        },

        error: (error) => {

          console.log(error);

          alert('Register Failed');

        }

      });

  }

}