package springLibrary.model.request;

import lombok.Data;
import springLibrary.entities.Genre;


@Data
public class GenreRequest {
    private Long id;
    private String name;

    public Genre toGenre() {
        Genre genre = new Genre();
        this.setGenreFromRequest(genre);
        return genre;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setGenreFromRequest(Genre genre) {
        genre.setName(name);
    }

    @Override
    public String toString() {
        return "GenreRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
