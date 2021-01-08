import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  pageOfProducts!: Array<any>;

  constructor(
    public productService: ProductService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  onChangePage(pageOfProducts: Array<any>): void {
    this.pageOfProducts = pageOfProducts;
}

  getAllProducts(): void {
    this.productService.getProducts().subscribe(
      (res: any) => (this.productService.products = res),
      (err: any) => console.error(err)
    );
  }

  editThisProduct(product: Product): void {
    this.productService.selectedProduct = product;
    this.router.navigate(['/new-product']);
  }

  deleteThisProduct(id: any): void {
    const confirmation = confirm(
      'Are you sure you want to eliminate this product?'
    );
    if (confirmation) {
      this.productService.deleteProduct(id).subscribe(
        (res: any) => this.getAllProducts(),
        (err: any) => console.error(err)
      );
    }
  }

}
