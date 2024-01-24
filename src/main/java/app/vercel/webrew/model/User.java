package app.vercel.webrew.model;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

@Entity // specifies that the class is a JPA entity. It will be mapped to a database table.
@Table(name = "Users") // specifies the name of the database table to which this entity is mapped
public class User {
    public enum Role {
        Admin, User;

        public String getName() {
            return this.name(); // This returns the string representation of the enum constant.
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="username", unique = true)
    @NotNull(message = "Enter username.")
    @Size(min=5,max=50, message = "User name must be between 5-50 characters long.")
    private String username;

    @Column(name="fullname", unique = true)
    @NotNull(message = "Enter user's full name.")
    @Size(min=5,max=50, message = "Full name must be between 5-50 characters long.")
    private String fullname;

    @Column(name="role")
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name="password")
    @NotNull
    @Size(min=5,max=50, message = "Password must be between 5-50 characters long.")
    private String password;

    @Column(name="email")
    @NotNull
    @Size(min=10,max=255, message = "Email must be between 10-255 characters long.")
    private String email;

}
