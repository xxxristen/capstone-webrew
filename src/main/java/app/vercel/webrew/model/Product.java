package app.vercel.webrew.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

// Using annotations from the Lombok library to create instances of setting, getting, creating with no arguments,
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

@Entity // specifies that the class is a JPA entity. It will be mapped to a database table.
@Table(name = "product") // // specifies the name of the database table to which this entity is mapped
public class Product {

    public enum ProductType {
        Tea, Teaware, Accessory
    }

    public enum TeaFormat {
        Loose_leaf, Powder, Tea_bag
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull(message = "Enter product name.")
    @Size(min = 5, max = 80, message = "Product name must be between 5-80 characters long.")
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ProductType type;

    @Column(name = "format")
    @Enumerated(EnumType.STRING)
    private TeaFormat format;

    @NumberFormat(style = NumberFormat.Style.CURRENCY)
    @NotNull(message = "Enter price of product.")
    @DecimalMin(value = "0.00", message = "Price should be of value 0 - 999.99.")
    @DecimalMax(value = "999.99", message = "Price should be of value 0 - 999.99.")
    @Column(name = "price")
    private Double price;

    @NotNull(message = "Country cannot be null.")
    @Size(max = 255, message = "Country should not exceed 255 characters.")
    @Column(name = "country")
    private String country;

    @NotBlank(message = "Enter a description for product.")
    @Size(min = 10, max = 500, message = "Description should be between 10-500 characters long.")
    @Column(name = "description")
    private String description;

    @Column(name = "imagepath")
    @NotNull(message = "Image path cannot be null.")
    @Size(max = 255, message = "Image path should not exceed 255 characters.")
    private String imagePath;

    @Column(name="smallimagepath")
    @Size(max = 255, message = "Small image path should not exceed 255 characters.")
    private String smallImagePath;
}
