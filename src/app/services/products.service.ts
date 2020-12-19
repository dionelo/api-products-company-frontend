import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) {}

  getProducts(): any {
    return this.http.get<any>(`${this.SERVER_URL}products`);
  }
}
