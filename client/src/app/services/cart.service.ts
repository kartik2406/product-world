import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = [];
  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    return this.cartItems.push(product);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter((item) => item._id !== product._id);
  }

  getTotal() {
    return this.cartItems.reduce((acc, cur) => acc + cur.price, 0);
  }
}
