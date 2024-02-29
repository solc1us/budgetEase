package budgetEase.mainapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import budgetEase.mainapp.models.MaxMonthlyOutcome;

@Repository
public interface MaxMonthlyOutcomeRepo extends JpaRepository<MaxMonthlyOutcome, String> {

  @Query("SELECT x FROM MaxMonthlyOutcome x where x.id_users = :id_users ORDER BY x.date_created DESC")
  List<MaxMonthlyOutcome> findTopByIdUsers(String id_users);

}
