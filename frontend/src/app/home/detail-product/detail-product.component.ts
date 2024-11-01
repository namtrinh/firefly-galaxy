import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product-service.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Product} from '../../model/product.model';
import {FormsModule} from '@angular/forms';
import {VNPayService} from '../../service/payment-service.service';
import {ImageService} from '../../service/img-service.service';
import {CommonModule} from '@angular/common';
import {CartService} from '../../service/cart-service.service';
import {Cart} from '../../model/cart.model';
import {format} from 'date-fns';
import {jwtDecode} from 'jwt-decode';
import {SharedDataService} from "../../service/shared-data.service";
import { ReviewService } from '../../service/review.service';
@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  quantity: number = 1;
  inf!: string;
  totalprice!: number;
  seo!: string;
  product: Product = new Product();
  showQuantitySelection = false;
  imgAvatars: { [key: string]: string } = {};
  showPay: boolean = false;
  cart: Cart = new Cart();
  isVisible: boolean = false;
  reviews: any[] = []; // Array to store reviews
  newReview: { reviewerName: string; content: string; rating: number } = { reviewerName: '', content: '', rating: 5 };
  constructor(
    private cartService: CartService,
    private imgService: ImageService,
    private productService: ProductService,
    private Activeroute: ActivatedRoute,
    private vnPayService: VNPayService,
    private reviewService: ReviewService
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getBySeotitle();
  }

  getBySeotitle() {
    this.seo = this.Activeroute.snapshot.params['seotitle'];
    this.productService.getBySeoTitle(this.seo).subscribe((data: any) => {
      this.product = data.result;
      if (this.product && this.product.product_id) {
        this.getImageFromService(this.product.image, this.product.product_id);
        this.loadReviews();
      }
    });
  }

  private getImageFromService(imageName: string, product_id: string): void {
    if (imageName) {
      this.imgService.getImage(imageName).subscribe(
        (data: any) => {
          const blob = new Blob([data], {type: 'image/*'});
          this.imgAvatars[product_id] = URL.createObjectURL(blob);
        });
    }
  }
  loadReviews(): void {
      this.reviewService.getReviewsByProductId(this.product.product_id).subscribe((data) => {
        this.reviews = data;
      });
    }
  submitReview(): void {
      if (this.newReview.reviewerName && this.newReview.content && this.newReview.rating) {
        this.reviewService.addReview(this.product.product_id, this.newReview).subscribe(() => {
          alert('Review submitted successfully');
          this.newReview = { reviewerName: '', content: '', rating: 5 }; // Reset form
          this.loadReviews(); // Refresh reviews list
        });
      }
    }
  addToCart() {
    const token = localStorage.getItem('auth_token') as string;
    const decodedToken = jwtDecode(token) as any;
    const user_Id = decodedToken.userId;
    this.cart.time_add = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.product.promotion && this.product.promotion.discount) {
      this.cart.product_price = this.product.price - (this.product.price * this.product.promotion.discount / 100);
    }else{
      this.cart.product_price = this.product.price;
    }
    this.cart.product_quantity = this.quantity;
    this.cart.product = {
      product_id: this.product.product_id
    };
    this.cart.user = {
      user_id: user_Id
    };
    this.cartService.addToCart(this.cart).subscribe((data: any) => {
      this.showToast();
    }, (error: any) => {
      console.error('Error adding to cart:', error);
    });
  }

  submitOrder() {
    this.totalprice = this.product.price * this.quantity;
    this.inf = this.product.name;
    this.vnPayService.submitOrder(this.totalprice, this.inf).subscribe(data => {
     window.location.href = data.vnpayUrl;
      localStorage.setItem('productId', this.product.product_id);
      console.log(localStorage.getItem('productId'));
    }, (error: any) => {
      console.log(error);
    });
  }

  increaseQuantity() {
    if (this.quantity <= this.product.quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  showToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}

