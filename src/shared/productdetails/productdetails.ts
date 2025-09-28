import { Product} from '../../core/interfaces/api.interface';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './productdetails.html',
  styleUrls: ['./productdetails.css'],
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    nav: true,
    navText: ['<', '>'],
    autoplay: true,
    autoplaySpeed: 500,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
