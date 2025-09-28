import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from '../../core/interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = `https://ecommerce.routemisr.com/api/v1`;
  endPoint = `/cart`;

  constructor(private http: HttpClient) {}

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}${this.endPoint}`,
      { productId },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}${this.endPoint}`, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  updateProductCount(
    productId: string,
    count: number
  ): Observable<CartResponse> {
    return this.http.put<CartResponse>(
      `${this.baseUrl}${this.endPoint}/${productId}`,
      { count },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }

  clearSpecificProduct(productId: string): Observable<CartResponse> {
    return this.http.delete<CartResponse>(
      `${this.baseUrl}${this.endPoint}/${productId}`,
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.endPoint}`, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });




}
  checkOutSession(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: {
          details: 'details',
          phone: '01010800921',
          city: 'Cairo',
        },
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }
}
