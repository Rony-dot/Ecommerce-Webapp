import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

   checkoutFromGroup !: FormGroup;
   totalQuantity : number = 0;
   totalPrice : number = 0.00;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFromGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress : this.formBuilder.group({
        street : [''],
        city : [''],
        country : [''],
        zipCode : [''],
      }),
      billingAddress : this.formBuilder.group({
        street : [''],
        city : [''],
        country : [''],
        zipCode : [''],
      }),
      creditCard : this.formBuilder.group({
        creditType : [''],
        nameOnCard : [''],
        cardNumber : [''],
        securityCode : [''],
        expirationMonth : [''],
        expirationYear : [''],
      })
    })
  }

  onSubmit(){
    console.log("reading form values")
    console.log(this.checkoutFromGroup.get('customer')!.value)
    console.log("email is : "+this.checkoutFromGroup.get('customer')!.value.email)
  }

  copyShippingToBillingAddress(event : Event) {
    // @ts-ignore
    if(event.target.checked){
      this.checkoutFromGroup.controls.billingAddress.setValue(this.checkoutFromGroup.controls.shippingAddress.value);
    }else{
      this.checkoutFromGroup.controls.billingAddress.reset();
    }
  }
}
