package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find all reviews for a specific product by product_id
    List<Review> findByProduct_Product_id(String product_id);

    // Paginated list of reviews for a product
    Page<Review> findByProduct_Product_id(String product_id, Pageable pageable);


    // Find average rating for a specific product
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.product_id = :product_id")
    Double findAverageRatingByProductId(@Param("product_id") String product_id);

    // Count reviews by rating for a specific product
    @Query("SELECT COUNT(r) FROM Review r WHERE r.product.product_id = :productId AND r.rating = :rating")
    Integer countReviewsByProductAndRating(@Param("product_id") String product_id, @Param("rating") int rating);

    // Find reviews with a specific rating or higher for a product
    List<Review> findByProductProductIdAndRatingGreaterThanEqual(String product_id, int rating);
}
