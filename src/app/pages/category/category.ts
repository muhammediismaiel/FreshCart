import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {
    categories: any[] = [];
  isLoading = true;
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    initFlowbite();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading categories', err);
        this.isLoading = false;
      },
    });
  }
}
