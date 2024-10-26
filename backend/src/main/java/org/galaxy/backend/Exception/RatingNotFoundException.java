package org.galaxy.backend.Exception;

public class RatingNotFoundException extends RuntimeException {
    public RatingNotFoundException(String message) {
        super(message);
    }
}
