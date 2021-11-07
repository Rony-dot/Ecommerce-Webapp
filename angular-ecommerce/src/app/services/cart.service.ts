// @ts-nocheck
import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];
  totalPrice : Subject<number> = new Subject<number>();
  totalQuantity : Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem : CartItem){
    // check if we already have the item in our cart
    let alreadyExistsInCart : boolean = false;
    let existingCartItem : CartItem;
    if(this.cartItems.length>0){
      // find the item in our cart based on the item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined)
      }
    if(alreadyExistsInCart){
      // increment the quantity
      existingCartItem.quantity++;
    }else{
      // add to the array
      this.cartItems.push(theCartItem);
    }
    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;
    for(let currentCartItem of this.cartItems ){
      totalPriceValue +=  currentCartItem.quantity * currentCartItem.unitPrice ;
      totalQuantityValue += currentCartItem.quantity;
    }
    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  //  log cart data just for debugging purpose
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`content of the cart`)
    for(let tempCartItem of this.cartItems){
      const subTotal = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name=${tempCartItem.name}, quantity=${tempCartItem.quantity}, uniPrice=${tempCartItem.unitPrice}, subTotal=${subTotal}`)
    }
    console.log(`totalPriceValue=${totalPriceValue.toFixed(2)}, totalQuantityValue=${totalQuantityValue}`)
    console.log("-------")
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity == 0){
      this.remove(cartItem);
    } else{
      this.computeCartTotals();
    }
  }

  remove (cartItem : CartItem){
    const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id === cartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
