import { Component, OnInit } from '@angular/core';
import { RatingService } from './rating.service';
import { RatingRequestDTO, RatingResponseDTO } from './rating.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratings: RatingResponseDTO[] = [];
  newRating: RatingRequestDTO = { score: 0, comment: '', productId: 1, userId: 1 };

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.getRatingsByProduct(this.newRating.productId);
  }

  // Thêm đánh giá mới
  addRating(): void {
    this.ratingService.addRating(this.newRating).subscribe({
      next: (response) => {
        console.log('Rating added successfully', response);
        this.ratings.push(response); // Thêm vào danh sách hiển thị
        this.resetForm(); // Xóa form sau khi gửi
      },
      error: (error) => console.error('Error adding rating', error)
    });
  }

  // Lấy đánh giá theo Product
  getRatingsByProduct(productId: number): void {
    this.ratingService.getRatingsByProduct(productId).subscribe({
      next: (data) => this.ratings = data,
      error: (error) => console.error('Error fetching ratings', error)
    });
  }

  // Reset form
  resetForm(): void {
    this.newRating = { score: 0, comment: '', productId: this.newRating.productId, userId: 1 };
  }
}
