package app.vercel.webrew.service;

import java.util.List;
import java.util.Optional;

import app.vercel.webrew.model.Product;

public interface ProductService {

    // Create product
    public Product createProduct(Product product);

    // Update product
    public Product updateProduct(Integer id, Product product);

    public void deleteProduct(Integer id);

    // Get all products
    public List<Product> getProducts();

    // Get products by type
    public List<Product> getProductsByType(Product.ProductType productType);

    // Get single product
    Optional<Product> getProduct(Integer id);

    // Get product by name
    public  Product getProductByName(String productName);
}
