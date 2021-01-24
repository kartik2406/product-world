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
  dummyDivObserver;
  dummyDiv;
  isLoading = true;
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
        this.skip = 0;
        this.listProducts();
      }); // Need to call subscr
    this.dummyDiv = document.querySelector('.dummy');
    this.dummyDivObserver = new IntersectionObserver(
      (entry, observer) => {
        console.log('entry', entry);
        let isDivVissible = entry[0].isIntersecting;
        if (isDivVissible && this.products.length) {
          console.log('entry:', entry);
          console.log('observer:', observer);
          this.skip += this.limit;
          this.apiService
            .getProducts({
              limit: this.limit,
              skip: this.skip,
              name: this.searchText,
              order: this.order,
            })
            .subscribe((products) => {
              this.products.push(...products);
              // console.log('products', products);
            });
        }
      },
      {
        rootMargin: '-600px 20px 75px 30px',
      }
    );

    this.dummyDivObserver.observe(this.dummyDiv);
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
        this.isLoading = false;
        this.products = products;
        this.setInCartFlag(this.products);
        // console.log('products', products);
      });
  }

  toggleOrder() {
    if (this.order === 'desc') this.order = 'asc';
    else this.order = 'desc';
    this.skip = 0;
    this.listProducts();
  }

  addToCart(product: Product) {
    // console.log('Addd', product);
    // Add to cart will be an API call later
    this.cartService.addToCart(product);
    let currentProduct = this.products.find((item) => item._id == product._id);
    currentProduct.isInCart = true;
    // console.log('Current cart', this.cartService.getCartItems());
  }

  removeFromCart(product: Product) {
    // console.log('Remove', product);
    this.cartService.removeFromCart(product);
    let currentProduct = this.products.find((item) => item._id == product._id);
    currentProduct.isInCart = false;
    // console.log('Current cart', this.cartService.getCartItems());
  }

  setInCartFlag(products: Product[]) {
    let inCartProducts = this.cartService.cartItems.map((item) => item._id);
    products.forEach((product) => {
      if (inCartProducts.includes(product._id)) {
        product.isInCart = true;
      }
    });
  }
  ngOnDestroy() {
    this.dummyDivObserver.unobserve(this.dummyDiv);
  }
}
