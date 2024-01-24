package app.vercel.webrew.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.vercel.webrew.model.Product;

import java.util.List;

public interface WeBrewRepository extends JpaRepository<Product, Integer>{
    Product findByName(String productName);
    List<Product> findByType(Product.ProductType productType);
}
