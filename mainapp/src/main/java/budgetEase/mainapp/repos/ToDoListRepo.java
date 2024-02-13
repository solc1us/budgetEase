package budgetEase.mainapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import budgetEase.mainapp.models.ToDoList;

@Repository
public interface ToDoListRepo extends JpaRepository<ToDoList, String>{
  
  @Query("SELECT x FROM ToDoList x where x.id_users = :id_users")
  List<ToDoList> findByIdUsers(String id_users);

}
