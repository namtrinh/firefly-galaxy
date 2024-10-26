package org.galaxy.backend.Controller;

import org.galaxy.backend.Service.RatingService;
import org.galaxy.backend.ModelDTO.request.RatingRequestDTO;
import org.galaxy.backend.ModelDTO.response.RatingResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<RatingResponseDTO> addRating(@RequestBody RatingRequestDTO ratingRequestDTO) {
        RatingResponseDTO savedRating = ratingService.addRating(ratingRequestDTO);
        return ResponseEntity.ok(savedRating);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<RatingResponseDTO>> getRatingsByProduct(@PathVariable Long productId) {
        List<RatingResponseDTO> ratings = ratingService.getRatingsByProduct(productId);
        return ResponseEntity.ok(ratings);
    }
}
