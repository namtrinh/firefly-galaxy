// src/app/rating/rating.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RatingRequestDTO, RatingResponseDTO } from './rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = '/api/ratings'; // URL của API trong backend

  constructor(private http: HttpClient) {}

  // Thêm một đánh giá mới
  addRating(ratingRequest: RatingRequestDTO): Observable<RatingResponseDTO> {
    return this.http.post<RatingResponseDTO>(`${this.apiUrl}`, ratingRequest);
  }

  // Lấy danh sách đánh giá theo productId
  getRatingsByProduct(productId: number): Observable<RatingResponseDTO[]> {
    return this.http.get<RatingResponseDTO[]>(`${this.apiUrl}/product/${productId}`);
  }
}
