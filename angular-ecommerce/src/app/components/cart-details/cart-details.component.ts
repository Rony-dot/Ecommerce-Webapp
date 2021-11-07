import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems  : CartItem[] = [];
  totalPriceValue ?: number = 0;
  totalQuantityValue ?: number = 0;
  constructor(private cartService : CartService) {
  }

  ngOnInit(): void {
    this.listProductDetails();
  }

  private listProductDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    // subscribe to the cart total price
    this.cartService.totalPrice.subscribe(
      data =>  this.totalPriceValue = data
    );
    // subscribe to the cart total quantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantityValue = data
    )
    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementItem(cartItem : CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementItem(cartItem : CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  removeItem(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
