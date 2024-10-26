package org.galaxy.backend.ServiceImpl;

import org.galaxy.backend.Exception.RatingNotFoundException;
import org.galaxy.backend.Model.Rating;
import org.galaxy.backend.ModelDTO.request.RatingRequestDTO;
import org.galaxy.backend.ModelDTO.response.RatingResponseDTO;
import org.galaxy.backend.Repository.RatingRepository;
import org.galaxy.backend.Service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public RatingResponseDTO addRating(RatingRequestDTO ratingRequestDTO) {
        // Tạo một thực thể Rating từ RatingRequestDTO
        Rating rating = new Rating();
        rating.setScore(ratingRequestDTO.getScore());
        rating.setComment(ratingRequestDTO.getComment());
        rating.setProductId(ratingRequestDTO.getProductId());
        rating.setUserId(ratingRequestDTO.getUserId());

        // Lưu vào cơ sở dữ liệu
        Rating savedRating = ratingRepository.save(rating);

        // Chuyển đổi Rating sang RatingResponseDTO và trả về
        return new RatingResponseDTO(savedRating);
    }

    @Override
    public List<RatingResponseDTO> getRatingsByProduct(Long productId) {
        // Lấy tất cả các đánh giá của sản phẩm từ cơ sở dữ liệu
        List<Rating> ratings = ratingRepository.findByProductId(productId);

        // Chuyển đổi từng Rating sang RatingResponseDTO và trả về danh sách
        return ratings.stream()
                .map(RatingResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public double getAverageRating(Long productId) {
        // Lấy danh sách các đánh giá của sản phẩm
        List<Rating> ratings = ratingRepository.findByProductId(productId);

        // Tính điểm trung bình và trả về
        return ratings.stream()
                .mapToInt(Rating::getScore)
                .average()
                .orElse(0.0);
    }
//    @Override
    public RatingResponseDTO getRatingById(Long ratingId) {
        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new RatingNotFoundException("Rating with ID " + ratingId + " not found"));
        return new RatingResponseDTO(rating);
    }
}
