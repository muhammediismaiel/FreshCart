import { ProductService } from './../../../core/services/product.service';
import { Component , OnInit} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  inputControl = new FormControl('');
  products: any[] = [];
  isLoading: boolean = false;   // ✅ حالة اللودينج

  constructor(private productService: ProductService , private cartService: CartService , private toaster: ToastrService) {}

  ngOnInit() {
    initFlowbite();

    this.inputControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.fetchProducts(value || '0');
      });
  }

  fetchProducts(price: string) {
    this.isLoading = true;
    this.productService.getProducts(price).subscribe({
      next: (res: any) => {
        this.products = res?.data || res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

 addProductToCart(productId : string) {
    this.cartService.addProductToCart(productId).subscribe({
      error : (error: any) => {
        console.log(error);
        this.toaster.error(error.message)
      },
      next:(response: any)=>{
        console.log(response);
        this.toaster.success(response.message)
      }
    })
  }
}
