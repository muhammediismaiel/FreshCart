import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';
export const routes: Routes =
[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },
  { path: 'cart', canActivate: [authGuard], loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
  { path: 'product', canActivate: [authGuard], loadComponent: () => import('./pages/product/product').then(m => m.Product) },
  { path: 'category', canActivate: [authGuard], loadComponent: () => import('./pages/category/category').then(m => m.Category) },
  { path: 'about', loadComponent: () => import('../shared/about/about').then(m => m.About) },
  { path: 'productdetails/:id', canActivate: [authGuard], loadComponent: () => import('../shared/productdetails/productdetails').then(m => m.ProductDetails) },
  { path: 'category/:id', canActivate: [authGuard], loadComponent: () => import('../shared/category-products/category-products').then(m => m.CategoryProductsComponent) },
  { path: '**', loadComponent: () => import('../shared/notfound/notfound').then(m => m.Notfound) }
];
