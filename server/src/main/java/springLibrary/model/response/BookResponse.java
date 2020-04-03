package springLibrary.model.response;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import springLibrary.controller.BookController;
import springLibrary.entities.Author;
import springLibrary.entities.Book;
import springLibrary.enums.Room;
import springLibrary.enums.Type;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.Iterator;
import java.util.Set;

@Data
public class BookResponse implements Comparable<BookResponse> {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookResponse.class);
    private Long id;
    private String name;
    private String image;
    private String isbn;
    private Integer publishYear;
    private String descr;
    private Long genreId;
    private Long publisherId;
    private String room;
    private Integer pageCount;
    private String placing;
    private String type;
    private Integer[] authorsId;


    public String getPlacing() {
        return placing;
    }

    public void setPlacing(String placing) {
        this.placing = placing;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public void setImage(byte[] image) {
        this.image = Base64.getEncoder().encodeToString(image);
    }

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(Integer publishYear) {
        this.publishYear = publishYear;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setPublisherId(Long publisherId) {
        this.publisherId = publisherId;
    }

    public Long getPublisherId() {
        return publisherId;
    }

    public void setAuthorsId(Set<Author> authors) {
        this.authorsId = new Integer[authors.size()];
        int index = 0;
        for (Iterator<Author> it = authors.iterator(); it.hasNext(); ) {
            Author author = it.next();
            authorsId[index++] = (int) author.getId().longValue();
        }
    }

    public static BookResponse of(Book book) {
        BookResponse response = new BookResponse();
        response.setId(book.getId());
        response.setName(book.getName());
        if (book.getImage() != null) {
            response.setImage(book.getImage());
        }
        response.setIsbn(book.getIsbn());
        response.setPublishYear(book.getPublishYear());
        response.setDescr(book.getDescr());
        response.setGenreId(book.getGenre().getId());
        response.setPublisherId(book.getPublisher().getId());
        response.setRoom(book.getRoom());
        response.setPageCount(book.getPageCount());
        response.setPlacing(book.getPlacing());
        response.setType(book.getType());
        return response;
    }

    public void setRoom(Room room) {
        this.room = Room.enumToString(room);
    }

    public void setType(Type type) {
        this.type = Type.enumToString(type);
    }

    public BookResponse() {

    }

    public BookResponse(Long id, String name, String image, String isbn, Integer publishYear, String descr, Long genreId, Long publisherId, String room, Integer pageCount, String placing, String type, Integer[] authorsId) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.descr = descr;
        this.genreId = genreId;
        this.publisherId = publisherId;
        this.room = room;
        this.pageCount = pageCount;
        this.placing = placing;
        this.type = type;
        this.authorsId = authorsId;
    }

    public String getRoom() {
        return room;
    }

    public String getType() {
        return type;
    }

    @Override
    public int compareTo(BookResponse o) {
        int result = this.name.compareTo(o.name);
            return result;
    }
}
