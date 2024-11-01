import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/reviews'; // Spring Boot API URL

  constructor(private http: HttpClient) {}

  // Fetch reviews for a specific product
  getReviewsByProductId(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${productId}`);
  }

  // Add a new review for a product
  addReview(productId: string, review: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${productId}`, review);
  }

  // Optional: Add more methods as needed
}
