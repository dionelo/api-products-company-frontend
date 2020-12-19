import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (res: Product[]) => (this.products = res),
      (err: any) => console.log(err)
    );
  }

}
