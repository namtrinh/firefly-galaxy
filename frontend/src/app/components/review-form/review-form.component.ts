import { Component, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input() productId!: string;
  reviewForm: FormGroup;

  constructor(private reviewService: ReviewService, private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      reviewerName: ['', Validators.required],
      content: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.reviewService.addReview(this.productId, this.reviewForm.value).subscribe(() => {
        alert('Review submitted successfully');
        this.reviewForm.reset({ rating: 5 });
      });
    }
  }
}
<form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
  <label for="reviewerName">Name:</label>
  <input id="reviewerName" formControlName="reviewerName" />

  <label for="content">Review:</label>
  <textarea id="content" formControlName="content"></textarea>

  <label for="rating">Rating:</label>
  <input id="rating" type="number" formControlName="rating" min="1" max="5" />

  <button type="submit" [disabled]="!reviewForm.valid">Submit Review</button>
</form>
