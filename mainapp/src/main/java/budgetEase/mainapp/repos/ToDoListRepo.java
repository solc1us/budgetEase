package budgetEase.mainapp.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import budgetEase.mainapp.models.ToDoList;

@Repository
public interface ToDoListRepo extends JpaRepository<ToDoList, String>{
  
}
