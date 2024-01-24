package app.vercel.webrew.service;

import app.vercel.webrew.model.Product;
import app.vercel.webrew.repository.WeBrewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private WeBrewRepository weBrewRepository;

    @InjectMocks
    private ProductServiceImpl productServiceImpl;

    private Product productA, productB, productC;

    @BeforeEach
    void init() {
        productA = new Product(1, "African rooibos honeybush tea", Product.ProductType.Tea, Product.TeaFormat.Loose_leaf, 40.12,
                "Africa", "African Rooibos Honeybush Tea is a naturally sweet and caffeine-free herbal blend combining the earthy notes of Rooibos with the floral and honey-like flavors of Honeybush creating a soothing antioxidant-rich beverage with African flair.",
                "/img/teas/african-rooibos-honeybush.jpg","/img/teas/oolong-tea.jpg");
        productB = new Product(2, "Red tea", Product.ProductType.Tea, Product.TeaFormat.Loose_leaf, 38.1, "Taiwan", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "/img/teas/oolong-tea.jpg", "/img/teas/oolong-tea.jpg");
        productC = new Product(3, "Purple tea", Product.ProductType.Tea, Product.TeaFormat.Loose_leaf, 42.55, "Malaysia", "Aenean quis nibh elit.", "/img/teas/herbal-floral-tea.jpg", "/img/teas/oolong-tea.jpg");
    }

    @Test
    @DisplayName("Create product")
    void createProduct() {
        when(weBrewRepository.save(any(Product.class)))
                .thenReturn(productA);

        Product newProduct = productServiceImpl.createProduct(productA);

        // The outcome
        assertNotNull(newProduct);
        assertThat(newProduct.getId()).isEqualTo(1);
    }

    @Test
    @DisplayName("Update product")
    void updateProduct() {
        when(weBrewRepository.existsById(any(Integer.class)))
                .thenReturn(true);

        when(weBrewRepository.save(any(Product.class)))
                .thenReturn(productA);

        productA.setFormat(Product.TeaFormat.Tea_bag);
        productA.setPrice(39.9);
        productA.setCountry("Thailand");
        productA.setDescription("Fusce vel bibendum turpis, nec euismod sem");
        productA.setImagePath("/img/teas/white-tea.jpg");
        productServiceImpl.updateProduct(productA.getId(), productA);

        assertNotNull(productA);
        assertEquals(Product.TeaFormat.Tea_bag,productA.getFormat());
        assertEquals(39.9,productA.getPrice());
        assertEquals("Thailand",productA.getCountry());
        assertEquals("Fusce vel bibendum turpis, nec euismod sem", productA.getDescription());
        assertEquals("/img/teas/white-tea.jpg", productA.getImagePath());
    }

    @Test
    @DisplayName("Delete product")
    void deleteProduct() {
        Integer id = 3;
        when(weBrewRepository.existsById(id)).thenReturn(true);
        doNothing().when(weBrewRepository).deleteById(any(Integer.class));
        productServiceImpl.deleteProduct(id);

        verify(weBrewRepository,times(1)).deleteById(id);
    }

    @Test
    @DisplayName("Get product")
    void getProducts() {
        List<Product> productList = new ArrayList<>();
        productList.add(productA);
        productList.add(productB);
        productList.add(productC);

        when(weBrewRepository.findAll())
                .thenReturn(productList);

        List<Product> result = productServiceImpl.getProducts();
        assertEquals(productList.size(), result.size());
        assertNotNull(result);
    }

    @Test
    @DisplayName("Get a product by id")
    void getProduct() {
        when(weBrewRepository.findById(any(Integer.class)))
                .thenReturn(Optional.ofNullable(productA));
        Optional<Product>currentProduct = productServiceImpl.getProduct(productA.getId());

        assertNotNull(currentProduct);
        assertThat(currentProduct.isEmpty()).isNotEqualTo(true);
    }

    @Test
    @DisplayName("Get product by name")
    void getProductByName() {
        when(weBrewRepository.findByName(any(String.class)))
                .thenReturn(productA);
        Product result = productServiceImpl.getProductByName(productA.getName());
        assertNotNull(result);
        assertEquals(productA, result);
    }
}
