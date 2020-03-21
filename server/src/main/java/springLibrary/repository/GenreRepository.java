package springLibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springLibrary.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
