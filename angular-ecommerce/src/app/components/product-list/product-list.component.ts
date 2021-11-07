import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

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
  previousKeyword : string = '';

  constructor(private productService: ProductService,
              private cartService : CartService,
              private route: ActivatedRoute) { }

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
    if(this.previousKeyword!= keyword){
      this.thePageNumber = 1;
    }
    // @ts-ignore
    this.previousKeyword = keyword;
    console.log(`theKeyWord = ${keyword} and thePageNumber = ${this.thePageNumber}`);
    if (keyword != null) {
      this.productService.searchProductsPaginate(this.thePageNumber-1,
        this.thePageSize,
        keyword)
        .subscribe(this.processResult());
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

  addToCart(theProduct : Product){
    console.log(`adding to cart : ${theProduct.name}, ${theProduct.unitPrice}`)
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);

  }

}
