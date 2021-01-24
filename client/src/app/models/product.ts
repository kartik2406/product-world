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
