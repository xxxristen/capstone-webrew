package app.vercel.webrew.service;

import app.vercel.webrew.exception.ResourceNotFoundException;
import app.vercel.webrew.model.Product;
import app.vercel.webrew.repository.WeBrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final WeBrewRepository weBrewRepository;

    private ProductServiceImpl(@Autowired WeBrewRepository weBrewRepository) {
        this.weBrewRepository = weBrewRepository;
    }

    // Create product
    @Override
    public Product createProduct(Product product) {
        weBrewRepository.save(product);
        return product;
    }

    // Update product
    @Override
    public Product updateProduct(Integer id, Product product) {
        if (weBrewRepository.existsById(id)) {
            product.setId(id);
            weBrewRepository.save(product);
        } else {
            throw new ResourceNotFoundException(id);
        }
        return product;
    }

    // Delete product
    @Override
    public void deleteProduct(Integer id) {
        if (weBrewRepository.existsById(id)) {
            weBrewRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException(id);
        }
    }

    // Get all products
    @Override
    public List<Product> getProducts() {
        return weBrewRepository.findAll();
    }

    // Get product by id
    @Override
    public Optional<Product> getProduct(Integer id) {
        try {
            return weBrewRepository.findById(id);
        } catch (Exception e) {
            throw new ResourceNotFoundException(id);
        }
    }

    // Get product by name
    @Override
    public Product getProductByName(String productName) {
        return weBrewRepository.findByName(productName);
    }

    @Override
    public List<Product> getProductsByType(Product.ProductType type) {
        return weBrewRepository.findByType(type);
    }
}
