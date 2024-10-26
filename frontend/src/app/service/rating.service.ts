import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:4300/api/ratings';

  constructor(private http: HttpClient) {}

  addRating(rating: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, rating);
  }

  getRatingsByProduct(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${productId}`);
  }
}
