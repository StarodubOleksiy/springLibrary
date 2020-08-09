package springLibrary.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import springLibrary.enums.Room;
import springLibrary.enums.Type;

import java.util.HashSet;
import java.util.Set;


public class Book implements java.io.Serializable {

    private Long id;
    @JsonIgnore
    private Set<Author> authors;
    private Genre genre;
    private Publisher publisher;
    private String name;
    private Integer pageCount;
    private String isbn;
    private Integer publishYear;
    private String descr;
    private Type type;
    private Room room;
    private String placing;
    private byte[] image;

      public Book() {
    }

    public Book(Long id, Genre genre, Publisher publisher, String name, Integer pageCount, String isbn, Integer publishYear,
                String descr, Room room, Type type, String placing, Set<Author> auhtors) {
        this.id = id;
        this.genre = genre;
        this.publisher = publisher;
        this.name = name;
        this.pageCount = pageCount;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.descr = descr;
        this.room = room;
        this.type = type;
        this.placing = placing;
        this.authors = auhtors;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Genre getGenre() {
        return this.genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Publisher getPublisher() {
        return this.publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Integer getPageCount() {
        return this.pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public String getIsbn() {
        return this.isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getPublishYear() {
        return this.publishYear;
    }

    public void setPublishYear(Integer publishYear) {
        this.publishYear = publishYear;
    }

    public String getDescr() {
        return this.descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getPlacing() {
        return placing;
    }

    public void setPlacing(String placing) {
        this.placing = placing;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }


    public void addAuthor(Author author) {
        if (this.authors == null)
            this.authors = new HashSet<>();
            authors.add(author);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Book)) return false;

        Book book = (Book) o;
        /*if( authors != null) {
            if (!authors.equals(book.authors)) return false;
        }*/
        if (!descr.equals(book.descr)) return false;
        if (!genre.equals(book.genre)) return false;
        if (!id.equals(book.id)) return false;
        if (!isbn.equals(book.isbn)) return false;
        if (!name.equals(book.name)) return false;
        if (!pageCount.equals(book.pageCount)) return false;
        if (!publishYear.equals(book.publishYear)) return false;
        if (!publisher.equals(book.publisher)) return false;
        return true;
    }

    @Override
    public int hashCode() {

        int result = 1;
        if (id != null)
            result = id.hashCode();
        // else {
          /* if( authors != null)
           result = 31 * result + authors.hashCode();*/
        result = 31 * result + genre.hashCode();
        result = 31 * result + publisher.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + pageCount.hashCode();
        result = 31 * result + isbn.hashCode();
        result = 31 * result + publishYear.hashCode();
        result = 31 * result + descr.hashCode();
        // }

        return result;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name=" + name +
                ", pageCount=" + pageCount +
                ", isbn=" + isbn +
                ", publishYear=" + publishYear +
                ", descr=" + descr +
                ", room=" + Room.enumToString(this.room) + '\n' +
                ", type=" + Type.enumToString(this.type) +
                ", placing=" + placing +
                ", authors=" + authors.toString() +
                '}';
    }
}
