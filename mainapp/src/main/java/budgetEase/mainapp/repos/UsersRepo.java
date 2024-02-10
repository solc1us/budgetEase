package budgetEase.mainapp.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import budgetEase.mainapp.models.Users;
import java.util.Optional;


@Repository
public interface UsersRepo extends JpaRepository<Users, String>{

  Optional<Users> findByUsername(String username);
  
}
