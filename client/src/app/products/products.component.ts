import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService, Product } from '../api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [];
  searchField: FormControl;
  searchText: string;
  limit = 100;
  skip = 0;
  order = 'desc';
  cartItems: Product[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.listProducts();
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.searchText = this.searchField.value;
        this.listProducts();
      }); // Need to call subscr
  }

  listProducts() {
    this.apiService
      .getProducts({
        limit: this.limit,
        skip: this.skip,
        name: this.searchText,
        order: this.order,
      })
      .subscribe((products) => {
        this.products = products;
        console.log('products', products);
      });
  }

  toggleOrder() {
    if (this.order === 'desc') this.order = 'asc';
    else this.order = 'desc';

    this.listProducts();
  }

  addToCart(product: Product) {
    console.log('Addd', product);
    // Add to cart will be an API call later
    this.cartService.addToCart(product);
    let currentProduct = this.products.find((item) => item._id == product._id);
    currentProduct.isInCart = true;
    console.log('Current cart', this.cartService.getCartItems());
  }

  removeFromCart(product: Product) {
    console.log('Remove', product);
    this.cartService.removeFromCart(product);
    let currentProduct = this.products.find((item) => item._id == product._id);
    currentProduct.isInCart = false;
    console.log('Current cart', this.cartService.getCartItems());
  }
}
