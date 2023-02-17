package springLibrary.model.request;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import springLibrary.entities.Book;
import springLibrary.enums.Room;
import springLibrary.enums.Type;

import java.util.Base64;


@Data
public class BookRequest {
    private Long id;
    private String name;
    private String image;
    private String isbn;
    private Integer publishYear;
    private String descr;
    private long genreId;
    private long publisherId;
    private String room;
    private Integer pageCount;
    private String placing;
    private String type;
    private Integer[] authorsId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public void setGenreId(long genreId) {
        this.genreId = genreId;
    }

    public void setPublisherId(long publisherId) {
        this.publisherId = publisherId;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public String getPlacing() {
        return placing;
    }

    public void setPlacing(String placing) {
        this.placing = placing;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAuthorsId(Integer[] authorsId) {
        this.authorsId = authorsId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getGenreId() {
        return genreId;
    }

    public long getPublisherId() {
        return publisherId;
    }

    public String getImage() {
        return image;
    }

    public Integer[] getAuthorsId() {
        return authorsId;
    }

    public Room getRoom() {
        return Room.stringToEnum(this.room);
    }


    public Type getType() {
        return Type.StringToEnum(this.type);

    }

    public Book toBook() {
        Book book = new Book();
        this.setBookFromRequest(book);
        return book;
    }

    public void setBookFromRequest(Book book)
    {
        book.setName(name);
        book.setIsbn(isbn);
        book.setPublishYear(publishYear);
        if (getImage() != null) {
            book.setImage(Base64.getDecoder().decode(getImage()));
        }
        book.setDescr(descr);
        book.setPageCount(pageCount);
        book.setType(this.getType());
        book.setRoom(this.getRoom());
        book.setPlacing(placing);
    }


    @Override
    public String toString() {
        return "BookRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isbn='" + isbn + '\'' +
                ", publishYear=" + publishYear +
                ", descr='" + descr + '\'' +
                ", room='" + room + '\'' +

                '}';
    }
}
