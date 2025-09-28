import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {CategoryService} from '../../core/services/category.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-products.html',
  styleUrls: ['./category-products.css']
})
export class CategoryProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.categoryService.getProductsByCategory(id).subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
