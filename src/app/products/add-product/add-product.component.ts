import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(public productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  resetForm(form: NgForm): void {
    form.reset();
  }

  addProduct(form: NgForm): void {
    console.log(form.value);
    if (form.value._id) {
      this.productService.updateProduct(form.value).subscribe(
        (res: any) => {
          console.log(res)
          this.router.navigate(['/'])
        },
        (err: any) => console.error(err)
      );
    } else {
      this.productService.createProduct(form.value).subscribe(
        (res: any) => {
          console.log(res)
          this.router.navigate(['/'])
        },
        (err: any) => console.error(err)
      );
    }
  }
}
