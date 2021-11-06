import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product : Product = new Product();

  constructor(private productService : ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.productDetailsView();
    })
  }

  private productDetailsView() {
    const productId = this.route.snapshot.paramMap.get("id");
    // @ts-ignore
    this.productService.getProductDetails(productId).subscribe(data =>{
      this.product = data;
    }, error => {
      console.log(`error is : ${error}`);
    });
  }
}
