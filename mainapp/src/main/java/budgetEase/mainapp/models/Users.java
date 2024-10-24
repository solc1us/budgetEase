package budgetEase.mainapp.models;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users {

    @Id
    private String id = UUID.randomUUID().toString();

    private String username;

    private String password;

    private String no_hp;

    private String email;

    private LocalDateTime date_created;

    private LocalDateTime last_login;

}
