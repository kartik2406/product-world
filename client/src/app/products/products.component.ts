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
  searchText: string;
  limit = 100;
  skip = 0;
  order = 'desc';
  constructor(private apiService: ApiService) {}

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
}
