package app.vercel.webrew.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import app.vercel.webrew.model.Product;
import app.vercel.webrew.service.ProductService;
import app.vercel.webrew.exception.ResourceNotFoundException;
import app.vercel.webrew.exception.EmptyProductListException;

// Controller class
@RestController
@RequestMapping("/api")
public class ProductServiceController {

    ProductService productService;

    public ProductServiceController(@Autowired ProductService productService) {
        this.productService = productService;
    }

    // Get all products:
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(@RequestParam(required = false) Product.ProductType type) {
        List<Product> productList;
        if (type == null) {
            productList = productService.getProducts();
        } else {
            productList = productService.getProductsByType(type);
        }
        if (productList.isEmpty()) {
            throw new EmptyProductListException("No product available.");
        } else {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        }
    }

    // GET Mapping for retrieving a specific product by ID:
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProduct(id).orElseThrow(() -> new ResourceNotFoundException(id));
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    // Get Mapping for retrieving products by type
    // @GetMapping("/products")
    // public ResponseEntity<List<Product>> getProductsByType(@RequestParam
    // Product.ProductType type) {
    // List<Product> productList = productService.getProductsByType(type);
    // if (productList.isEmpty()) {
    // throw new EmptyProductListException("No product available.");
    // }
    // return new ResponseEntity<>(productList, HttpStatus.OK);
    // }

    // POST Mapping for creating a new product:
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        productService.createProduct(product);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    // Update an existing product:
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @Valid @RequestBody Product product) {
        try {
            productService.updateProduct(id, product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Delete a product
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted.", HttpStatus.OK);
    }
}
