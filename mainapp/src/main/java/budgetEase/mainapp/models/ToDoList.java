package budgetEase.mainapp.models;

import java.time.LocalDate;
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
@Table(name = "todolist")
public class ToDoList {

  @Id
  private String id = UUID.randomUUID().toString();

  private String id_users;

  private String kegiatan;

  private boolean isCheck;

  private LocalDate deadline;

  private LocalDate tanggal;

  private LocalDateTime date_created;
  
}
