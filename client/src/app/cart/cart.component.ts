import { Component, OnInit } from '@angular/core';
import { ApiService, Product } from '../api.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  checkout() {
    this.apiService
      .checkout({
        amount: this.cartService.getTotal(),
        purpose: 'Payment for books',
        redirectUrl: `${window.location.origin}/checkout`,
      })
      .subscribe((res: any) => {
        window.location.href = res.redirectUrl;
        console.log('checkout res', res);
      });
  }

  removeFromCart(product: Product) {
    console.log('removeFromCart', product);
    this.cartService.removeFromCart(product);
  }
}
