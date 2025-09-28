import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductService } from '../../../core/services/product.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import {CategoryService} from '../../../core/services/category.service';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [CarouselModule , RouterLink],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {
  Categories: any[] = [];
  products: any[] = [];
  isLoadingCategories: boolean = true;
  isLoadingProducts: boolean = true;


  ngOnInit() {
    initFlowbite();
    this.getcategories();
    this.getAllProducts();
  }
  constructor(private productService: ProductService , private categoryService: CategoryService , private cartService: CartService , private toaster: ToastrService) {}

  getcategories() {
    this.isLoadingCategories = true;
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.Categories = res.data;
        this.isLoadingCategories = false;
      },
      error: () => {
        this.isLoadingCategories = false;
      },
    });
  }

  getAllProducts() {
    this.isLoadingProducts = true;
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoadingProducts = false;
      },
      error: () => {
        this.isLoadingProducts = false;
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    navText: ['<', '>'],
    margin: 10,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
  };

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
