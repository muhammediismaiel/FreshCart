import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(price: string, page: number = 1): Observable<any> {
    return this.http
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?limit=40&page=${page}&price[gte]=${price}`
      )
      .pipe();
  }


   getAllProducts(page: number = 1): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products?limit=40&page=${page}`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).pipe();
  }
}
