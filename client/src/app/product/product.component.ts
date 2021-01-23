import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../api.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  addToCart() {
    this.add.emit(this.product);
  }
  removeFromCart() {
    this.remove.emit(this.product);
  }
}
