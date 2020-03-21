package springLibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import springLibrary.entities.Book;
import springLibrary.entities.Publisher;

import java.util.List;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    @Query("select d from Publisher d where d.name like %?1%")
    List<Publisher> findByName(String name);

    @Query("select d from Publisher d where d.city like %?1%")
    List<Publisher> findByCity(String city);

    @Query("select d from Publisher d where d.name like ?1%")
    List<Publisher> findByCharacter(Character letter);

}
