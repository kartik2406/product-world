import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  checkout() {
    if (!this.authService.isLoggedIn())
      return this.router.navigateByUrl('/login');
    this.apiService.checkout().subscribe((res: any) => {
      // console.log('checkout res', res);
    });
  }

  removeFromCart(product: Product) {
    // console.log('removeFromCart', product);
    this.cartService.removeFromCart(product);
  }
}
