package springLibrary.model.request;

import lombok.Data;
import springLibrary.entities.Genre;


@Data
public class GenreRequest {
    private Long id;
    private String name;

    public Genre toGenre() {
        Genre genre = new Genre();
        genre.setName(name);
        return genre;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "GenreRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
