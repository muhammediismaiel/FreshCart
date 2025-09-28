import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartResponse } from '../../../core/interfaces/api.interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartData: CartResponse | null = null;
  isLoading = false;
  isUpdateLoading = false;

  cartService = inject(CartService);
  toaster = inject(ToastrService);

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.isLoading = true;

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.cartData = response;
      },
      error: (err) => {
        this.isLoading = false;
        this.toaster.error(err.error.message);
      },
    });
  }

  updateCount(productId: string, count: number) {
    this.cartService.updateProductCount(productId, count).subscribe({
      next: (response) => {
        console.log(response);
        this.cartData = response;

      },
      error: (err) => {
        this.toaster.error(err.error.message);
        this.isUpdateLoading = false;
      }
    })
  }


  deleteProduct(id:string){
    this.cartService.clearSpecificProduct(id).subscribe({

      error:(err)=>{
        this.toaster.error(err.error.message)
      },
      next:(response)=>{
        console.log(response);
        this.cartData = response ;
        // this.getCartData()

      }
    })
  }


  clearCart(){
    this.cartService.clearCart().subscribe({

      error:(err)=>{
        this.toaster.error(err.error.message)
      },
      next:(response)=>{
        console.log(response);
        this.cartData = null ;
        // this.getCartData()
      }
    })
  }

  checkOutSession(id:string){
    this.cartService.checkOutSession(id).subscribe({
      error:(err)=>{
        this.toaster.error(err.error.message)
      },
      next:(response)=>{
        console.log(response);
       window.location.href =  response.session.url;

      }
    })
  }

}
