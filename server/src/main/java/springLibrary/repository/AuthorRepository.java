package springLibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import springLibrary.entities.Author;
import springLibrary.entities.Book;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    @Query("select d from Author d where d.fio like %?1%")
    public List<Author> findByFio(String fio);

    @Query("select d from Author d where d.fio like ?1%")
    List<Author> findByCharacter(Character letter);

}
