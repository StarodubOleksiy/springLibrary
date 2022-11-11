package springLibrary.model.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import springLibrary.entities.Author;
import springLibrary.entities.Genre;

@Data
public class AuthorRequest {

    private Long id;
    private String name;
    private Integer[] booksId;

    public Author toAuthor() {
        Author author = new Author();
        if (id != null)
            author.setId(id);
        author.setFio(name);

        return author;
    }

    public Integer[] getBooksId() {
        return booksId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        StringBuilder toString = new StringBuilder("AuthorRequest{" +
                "id=" + id +
                ", name='" + name + '\'');
        if (booksId != null) {
            if (booksId.length == 0)
                toString.append("booksId = is not null but empty. There are no book.");
            else
                for (int i = 0; i < booksId.length; ++i)
                    toString.append(" booksId = " + booksId[i]);
        } else
            toString.append("booksId = null");
        toString.append('}');
        return toString.toString();
    }
}
