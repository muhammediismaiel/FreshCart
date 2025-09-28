import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  getProductsByCategory(id: string, page: number = 1): Observable<any> {
  return this.http.get(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}&limit=40&page=${page}`
  );
}


  getCategories(page: number = 1): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/categories?limit=40&page=${page}`);
  }

}
