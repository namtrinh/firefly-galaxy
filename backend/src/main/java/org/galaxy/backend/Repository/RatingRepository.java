package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    // Tìm tất cả các đánh giá theo productId
    List<Rating> findByProductId(Long productId);
}
