package budgetEase.mainapp.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import budgetEase.mainapp.models.Cashflow;
import java.util.List;



@Repository
public interface CashflowRepo extends JpaRepository<Cashflow, String>{

  @Query("SELECT x FROM Cashflow x where x.id_users = :id_users")
  List<Cashflow> findByIdUsers(String id_users);
  
}
