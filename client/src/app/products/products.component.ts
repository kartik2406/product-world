import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [];
  searchField: FormControl;
  limit = 100;
  skip = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.listProducts();
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.listProducts(value);
      }); // Need to call subscr
  }

  listProducts(name?: string) {
    this.apiService
      .getProducts({
        limit: this.limit,
        skip: this.skip,
        name,
      })
      .subscribe((products) => {
        this.products = products;
        console.log('products', products);
      });
  }
}
