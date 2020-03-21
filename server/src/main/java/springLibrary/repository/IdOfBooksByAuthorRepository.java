package springLibrary.repository;

import springLibrary.entities.Book;
import springLibrary.model.response.BookResponse;

import java.util.List;

public interface IdOfBooksByAuthorRepository {

    public List<Long> getIdOfBooks(long id);

}
