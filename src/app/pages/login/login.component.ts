import { Component }
from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { AuthService }
from '../../services/auth.service';

import { Router }
from '@angular/router';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './login.component.html',

  styleUrl: './login.component.css'

})

export class LoginComponent {

  email = '';

  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {

      email: this.email,

      password: this.password

    };

    this.authService
      .login(data)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          // Save token
          localStorage.setItem(
            'token',
            response.token
          );

          alert('Login Success');

          this.router.navigate(['/products']);

        },

        error: (error) => {

          console.log(error);

          alert('Login Failed');

        }

      });

  }

  ngOnInit() {

  if (
    this.authService.isLoggedIn()
  ) {

    this.router.navigate([
      '/products'
    ]);

  }

}

}