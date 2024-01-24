package app.vercel.webrew.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Order(Ordered.HIGHEST_PRECEDENCE) // For exceptions, GlobalExceptionHandler takes highest precedence
@ControllerAdvice // Defines a global exception handler for the Spring MVC application.
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Overrides the default behavior for handling NoResourceFoundException, 404.
    @Override
    protected ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return ResponseEntity.status(HttpStatus.FOUND)
                // Set the location header to custom 404 error page's url
                .location(URI.create("/404"))
                // Build the ResponseEntity object
                .build();
    }
    // e.g. when entered url has an additional / (e.g. //products.html). Do not try with more than 2 /'s as I did not handle URL normalisation
    @ExceptionHandler(RequestRejectedException.class)
    protected ResponseEntity<Object> handleRequestRejectedException(HttpServletRequest request, Exception ex) {
        return ResponseEntity.status(HttpStatus.FOUND)
                // Set the location header to custom error page's url
                .location(URI.create("/error"))
                // Build the ResponseEntity object
                .build();
    }

    // Handle EmptyTaskListException - empty product list
    @ExceptionHandler(EmptyProductListException.class)
    protected ResponseEntity<Object> handleHttpMessageNotReadable(EmptyProductListException em) {
        String errorResponse = em.getMessage();
        return new ResponseEntity<>(errorResponse, HttpStatus.OK);
    }

    // Handle ResourceNotFoundException - id not found
    @ExceptionHandler(ResourceNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(ResourceNotFoundException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Address when input is not valid
    @Override // Overriding method found in global exception handler
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        // Consolidate all errors
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((err) -> {
            String field = ((FieldError) err).getField();
            String errMsg = err.getDefaultMessage();
            errors.put(field, errMsg);
        });
        // Consolidate all error responses
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", errors);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request){

        MessageNotReadableException messageNotReadableException = new MessageNotReadableException();
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", messageNotReadableException.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}