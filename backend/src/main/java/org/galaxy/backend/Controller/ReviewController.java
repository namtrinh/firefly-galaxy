package org.galaxy.backend.Controller;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/{productId}")
    public Review addReview(@PathVariable String product_id, @RequestBody Review review) {
        review.setProduct(new Product(product_id)); // Set the product reference
        return reviewRepository.save(review);
    }

    @GetMapping("/{productId}")
    public List<Review> getReviews(@PathVariable String product_id) {
        return reviewRepository.findByProduct_Product_id(product_id); // Adjust to use correct repository method
    }
}
