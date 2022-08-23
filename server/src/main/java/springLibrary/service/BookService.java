package springLibrary.service;

import springLibrary.entities.Book;
import springLibrary.model.request.BookRequest;
import springLibrary.model.response.BookResponse;
import springLibrary.repository.BookRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Администратор on 23.02.18.
 */

public interface BookService  extends Service<Book, Long, BookRepository> {

   public List<Book> findByName(String name);

   public List<Book> findByCharacter(Character letter);

   public List<Book> findByGenre(long id);

   public List<Book> findByPublisher(long id);

   public List<BookResponse> findAllResponse();

   public Optional<BookResponse> findByIdResponse(Long id);

   public void saveFromRequest(Book book, BookRequest bookRequest);

   public List<BookResponse> findByGenreResponse(long id);

   public List<BookResponse> findByPublisherResponse(long id);

   public List<BookResponse> findByAuthorResponse(long id);

   public void deleteBook(BookRequest bookRequest);

   public List<BookResponse> findByCharacterResponse(String character);

   public List<BookResponse> findByTitleResponse(String title);

   public void deleteRelationshipBetweenBooksAndAuthor(long idOfBook);

   public void insertRelationshipBetweenBookAndAuthor(long idOfAuthor, long idOfBook);

   public List<BookResponse> findByPlacingResponse(String room, String placing);

   public void updateFromRequest(Long id, BookRequest bookRequest);


}
