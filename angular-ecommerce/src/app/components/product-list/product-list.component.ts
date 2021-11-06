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

  thePageNumber : number = 1;
  thePageSize : number = 5;
  theTotalElements : number = 0;
  private previousCategoryId: number = 1 ;

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

    if(this.previousCategoryId != this.categoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.categoryId;
    console.log(`currentCategoryId = ${this.categoryId} and thePageNumber = ${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                                       this.thePageSize,
                                                       this.categoryId)
                                                       .subscribe(this.processResult());
    console.log("products");
    console.log(this.products);
  }

   processResult() {
    // @ts-ignore
     return data =>{
      this.products =  data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    };
  }

  updatePageSize(event: Event) {
    // @ts-ignore
    this.thePageSize = event.target.value;
    this.thePageNumber = 1;
    this.getAllProducts();
  }
}
