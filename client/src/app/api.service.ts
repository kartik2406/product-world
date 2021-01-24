import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';

export interface Product {
  _id: String;
  name: string;
  authors: String;
  average_rating: string;
  isbn: number;
  langauge_code: string;
  price: number;
  ratings_count: number;
  type: string;
  isInCart?: boolean;
}

export interface ProductFilter {
  name?: string;
  limit: number;
  skip: number;
  order: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  images: [];
  constructor(private http: HttpClient) {}

  getRandomImage() {
    const min = 0;
    const max = this.images.length;
    const randomIndex = Math.floor(Math.random() * (max - min) + min);
    // console.log(this.images, randomIndex);
    return this.images[randomIndex];
  }
  getProducts(filter: ProductFilter): Observable<any> {
    let queryString = Object.keys(filter)
      .filter((key) => filter[key] !== undefined)
      .map((key) => `${key}=${filter[key]}`)
      .join('&');
    return forkJoin([
      this.http
        .get(`/api/products?${queryString}`)
        .pipe(map((val) => val['products'])),
      this.getImages(),
    ]).pipe(
      map((results, index) => {
        let products = results[0];
        products = products.map((product) => {
          product.image = this.getRandomImage();
          return product;
        });
        return products;
      })
    );
  }

  getImages() {
    if (this.images && this.images.length) return from(this.images);
    return this.http
      .get(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/bookimage816b123.json'
      )
      .pipe(
        map((images: any) => images.map((image) => image.Image)),
        map((images) => {
          this.images = images;
          return images;
        })
      );
  }

  checkout(paymentDetails) {
    return this.http.post('/api/cart/checkout', paymentDetails);
  }
}
