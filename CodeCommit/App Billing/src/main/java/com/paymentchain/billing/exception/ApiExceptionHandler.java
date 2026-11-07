package com.paymentchain.billing.exception;

import com.paymentchain.billing.common.StandarizedApiExceptionResponse;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<StandarizedApiExceptionResponse> handleBusinessRuleException(BusinessRuleException ex) {
        HttpStatus status = ex.getHttpStatus() == null ? HttpStatus.INTERNAL_SERVER_ERROR : ex.getHttpStatus();
        String detail = status.is5xxServerError() ? "The request could not be completed." : ex.getMessage();
        return response(status, ex.getCode(), detail);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<StandarizedApiExceptionResponse> handleStatusException(ResponseStatusException ex) {
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
        return response(status, Integer.toString(status.value()), status.is5xxServerError()
                ? "The request could not be completed." : ex.getReason());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<StandarizedApiExceptionResponse> handleMissingRoute(NoResourceFoundException ex) {
        return response(HttpStatus.NOT_FOUND, "404", "The requested resource was not found.");
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<StandarizedApiExceptionResponse> handleUnsupportedMethod(
            HttpRequestMethodNotSupportedException ex) {
        return response(HttpStatus.METHOD_NOT_ALLOWED, "405", "The HTTP method is not supported for this resource.");
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<StandarizedApiExceptionResponse> handleUnsupportedMediaType(
            HttpMediaTypeNotSupportedException ex) {
        return response(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "415", "The request media type is not supported.");
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class,
        MethodArgumentTypeMismatchException.class})
    public ResponseEntity<StandarizedApiExceptionResponse> handleBadRequest(Exception ex) {
        String detail = ex instanceof MethodArgumentNotValidException validation
                ? validation.getBindingResult().getFieldErrors().stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.joining("; "))
                : "Request body or parameter is invalid.";
        return response(HttpStatus.BAD_REQUEST, "400", detail);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandarizedApiExceptionResponse> handleUnexpectedException(Exception ex) {
        return response(HttpStatus.INTERNAL_SERVER_ERROR, "500", "The request could not be completed.");
    }

    private ResponseEntity<StandarizedApiExceptionResponse> response(HttpStatus status, String code, String detail) {
        return ResponseEntity.status(status)
                .body(new StandarizedApiExceptionResponse(status.getReasonPhrase(), code, detail));
    }
}
