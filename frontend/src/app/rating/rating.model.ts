// src/app/rating/rating.model.ts
export interface RatingRequestDTO {
  score: number;
  comment: string;
  productId: number;
  userId: number;
}

export interface RatingResponseDTO {
  id: number;
  score: number;
  comment: string;
  productId: number;
  userId: number;
  createdDate: Date;
}
