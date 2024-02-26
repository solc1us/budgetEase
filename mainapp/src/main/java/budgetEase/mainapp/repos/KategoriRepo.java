package budgetEase.mainapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import budgetEase.mainapp.models.Kategori;

@Repository
public interface KategoriRepo extends JpaRepository<Kategori, String> {

  @Query("SELECT x FROM Kategori x where x.id_users = :id_users")
  List<Kategori> findByIdUsers(String id_users);

}
