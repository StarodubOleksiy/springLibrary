package springLibrary.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.util.StringUtils;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class Author implements java.io.Serializable {
    private Long id;
    private String fio;
    @JsonIgnore
    private Set<Book> books;


    public Author() {
    }

    public Author(String fio) {
        this.fio = fio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = StringUtils.capitalize(fio.toLowerCase());
    }

    public void createBooks() {
        this.books = new HashSet<>();
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Author author = (Author) o;

        if (id != author.id) return false;
        if (fio != null ? !fio.equals(author.fio) : author.fio != null) return false;

        return true;
    }


    public void addBook(Book book) {
        if (this.books == null)
            this.books = new HashSet<>();
        books.add(book);
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (fio != null ? fio.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        if (id != null && books != null)
            return "id = " + id + " fio " + fio + " number of books =" + books.size();
        else
            return "fio = " + fio;
    }
}
