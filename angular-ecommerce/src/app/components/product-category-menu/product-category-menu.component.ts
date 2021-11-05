import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories ?: ProductCategory[];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe(data =>{
      console.log("product category "+JSON.stringify(data));
      console.log(data)
      this.productCategories = data;
    }, error => {
      console.log(error);
    })
    console.log("menu component invoked")
  }
}
