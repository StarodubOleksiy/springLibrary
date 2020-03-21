package springLibrary.model.response;


import lombok.Data;
import springLibrary.entities.Author;
import springLibrary.entities.Book;

import java.util.Iterator;
import java.util.Set;

@Data
public class AuthorResponse implements Comparable<AuthorResponse> {
    private Long id;
    private String name;
    private Integer[] booksId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBooksId(Set<Book> books) {
        this.booksId = new Integer[books.size()];
        int index = 0;
        for (Iterator<Book> it = books.iterator(); it.hasNext(); ) {
            Book book = it.next();
            booksId[index++] = (int) book.getId().longValue();
        }
    }


    public static AuthorResponse of(Author author) {
        AuthorResponse response = new AuthorResponse();
        response.setId(author.getId());
        response.setName(author.getFio());
        return response;
    }

    @Override
    public int compareTo(AuthorResponse o) {
        int result = this.name.compareTo(o.name);
        if (result == 0) {
            result = this.id.compareTo(o.id);
        }
        return result;
    }
}
