package org.galaxy.backend.Exception;

public class InvalidRatingException extends RuntimeException {
    public InvalidRatingException(String message) {
        super(message);
    }
}
