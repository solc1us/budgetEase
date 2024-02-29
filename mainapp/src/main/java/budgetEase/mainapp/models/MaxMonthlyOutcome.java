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
@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "maxmonthlyoutcome")
public class MaxMonthlyOutcome {
  
  @Id
  private String id = UUID.randomUUID().toString();

  private String id_users;

  private Long nominal;

  private LocalDateTime date_created;
}
