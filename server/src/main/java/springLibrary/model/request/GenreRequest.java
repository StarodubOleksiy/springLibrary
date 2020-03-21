package springLibrary.model.request;

import lombok.Data;
import springLibrary.entities.Genre;


@Data
public class GenreRequest {
    private Long id;
    private String name;

    public Genre toGenre() {
        Genre genre = new Genre();
        if(id != null)
        genre.setId(id);
        genre.setName(name);
        return genre;
    }

    @Override
    public String toString() {
        return "GenreRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
