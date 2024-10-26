package org.galaxy.backend.Exception;

import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandle {
    // catch error directly
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> getHandlingException(RuntimeException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(exception.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    // catch error available
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> getAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> getAccessDeniedResponse(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZATION;

        return ResponseEntity.status(errorCode.getStatusCode())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    // exception for modal,dto
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> getHandlingException(MethodArgumentNotValidException exception) {
        String enumkey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.UNKNOWN_ERROR;
        try {
            errorCode = ErrorCode.valueOf(enumkey);
        } catch (IllegalArgumentException e) {
        }

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    // Handle Rating Not Found Exception
    @ExceptionHandler(RatingNotFoundException.class)
    public ResponseEntity<String> handleRatingNotFoundException(RatingNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handle Invalid Rating Exception
    @ExceptionHandler(InvalidRatingException.class)
    public ResponseEntity<String> handleInvalidRatingException(InvalidRatingException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // Handle any other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
