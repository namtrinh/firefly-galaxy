package org.galaxy.backend.Service;

import org.galaxy.backend.ModelDTO.request.RatingRequestDTO;
import org.galaxy.backend.ModelDTO.response.RatingResponseDTO;

import java.util.List;

public interface RatingService {
    // Thêm một đánh giá mới
    RatingResponseDTO addRating(RatingRequestDTO ratingRequestDTO);

    // Lấy danh sách đánh giá theo productId
    List<RatingResponseDTO> getRatingsByProduct(Long productId);

    // Lấy điểm đánh giá trung bình cho sản phẩm
    double getAverageRating(Long productId);
}
