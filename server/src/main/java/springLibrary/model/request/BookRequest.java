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

    private Room getRoom() {
        return Room.stringToEnum(this.room);
    }


    private Type getType() {
        return Type.StringToEnum(this.type);

    }

    public Book toBook() {
        Book book = new Book();
        if (id != null)
            book.setId(id);
        book.setName(name);
        book.setIsbn(isbn);
        book.setPublishYear(publishYear);
        book.setDescr(descr);
        book.setPageCount(pageCount);
        book.setType(this.getType());
        book.setRoom(this.getRoom());
        book.setPlacing(placing);
        return book;
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
