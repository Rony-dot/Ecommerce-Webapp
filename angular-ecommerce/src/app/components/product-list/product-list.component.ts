import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  categoryId : number = 1;
  searchMode : boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getAllProducts();
    })
  }

  getAllProducts () {
   this.searchMode = this.route.snapshot.paramMap.has("keyword");
   if(this.searchMode){
     this.handleAllProductsByCategoryName()
   }else{
     this.handleAllProducts()
   }
  }

  handleAllProductsByCategoryName(){
    const keyword = this.route.snapshot.paramMap.get("keyword");
    if (keyword != null) {
      this.productService.getProductsByCategoryName(keyword).subscribe(data => {
        this.products = data;
      })
    }
  }
  handleAllProducts(){
    const hasProductId = this.route.snapshot.paramMap.has("id");
    if(hasProductId){
      // @ts-ignore
      this.categoryId = +this.route.snapshot.paramMap.get("id");
    }else{
      this.categoryId = 1;
    }
    this.productService.getProductList(this.categoryId).subscribe(data =>{
      this.products =  data;
    }, error => {
    })
    console.log("products");
    console.log(this.products);
  }

}
