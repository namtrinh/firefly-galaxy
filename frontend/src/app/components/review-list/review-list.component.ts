import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() product_id!: string;
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewsByProductId(this.productId).subscribe(data => {
      this.reviews = data;
    });
  }
}
<div *ngIf="reviews.length > 0; else noReviews">
  <div *ngFor="let review of reviews" class="review">
    <h4>{{ review.reviewerName }}</h4>
    <p>{{ review.content }}</p>
    <p>Rating: {{ review.rating }}/5</p>
  </div>
</div>
<ng-template #noReviews>
  <p>No reviews available for this product.</p>
</ng-template>
