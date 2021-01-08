import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SERVER_URL = environment.SERVER_URL;
  products!: Product[];
  selectedProduct: Product = {
    _id: '',
    name: '',
    category: '',
    price: undefined,
    imageURL: '',
  };

  constructor(private http: HttpClient) {}

  getProducts(): any {
    return this.http.get<Product[]>(`${this.SERVER_URL}products`);
  }

  createProduct(product: Product): Observable<object> {
    return this.http.post(`${this.SERVER_URL}products`, product);
  }

  updateProduct(product: Product): Observable<object> {
    return this.http.put(`${this.SERVER_URL}products/${product._id}`, product);
  }

  deleteProduct(id: string): Observable<object> {
    return this.http.delete(`${this.SERVER_URL}products/${id}`);
  }
}
