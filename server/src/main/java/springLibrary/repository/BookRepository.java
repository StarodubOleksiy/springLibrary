package springLibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import springLibrary.entities.Book;
import springLibrary.enums.Room;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("select d from Book d where d.name like %?1%")
    List<Book> findByName(String name);

    @Query("select d from Book d where d.name like ?1%")
    List<Book> findByCharacter(Character letter);

    @Query("select d from Book d where d.genre.id=?1")
    List<Book> findByGenre(Long id);


    @Query("select d from Book d where d.publisher.id=?1")
    List<Book> findByPublisher(Long id);

    @Query("select d from Book d where d.room=?1 and placing like %?2%")
    List<Book> findByPlacing(Room ROOM, String placing);

}
