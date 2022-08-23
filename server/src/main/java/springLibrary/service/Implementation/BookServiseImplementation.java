package springLibrary.service.Implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;
import springLibrary.entities.Author;
import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.enums.Room;
import springLibrary.model.request.BookRequest;
import springLibrary.model.response.BookResponse;
import springLibrary.repository.BookRepository;
import springLibrary.repository.GenreRepository;
import springLibrary.repository.IdOfBooksByAuthorRepository;
import springLibrary.service.*;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Администратор on 23.02.18.
 */

@Service
public class BookServiseImplementation extends AbstractService<Book, Long, BookRepository> implements BookService {

    @Autowired
    GenreService genreService;

    @Autowired
    IdOfBooksByAuthorRepository idOfBooksByAuthorRepository;

    @Autowired
    AuthorService authorService;

    @Autowired
    PublisherService publisherService;

    @Autowired
    JdbcTemplate jdbcTemplate;


    protected BookServiseImplementation(@Autowired BookRepository repository) {
        super(repository);
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(BookServiseImplementation.class);


    @Override
    public List<Book> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<Book> findByCharacter(Character letter) {
        return repository.findByCharacter(letter);
    }


    @Override
    public List<Book> findByGenre(long id) {
        return repository.findByGenre(id);
    }


    @Override
    public List<Book> findByPublisher(long id) {
        return repository.findByPublisher(id);
    }


    private BookResponse bookToBookResponse(Book book) {
        BookResponse response = new BookResponse();
        response.setId(book.getId());
        response.setName(book.getName());
        if (book.getImage() != null)
            response.setImage(book.getImage());
        response.setIsbn(book.getIsbn());
        response.setPublishYear(book.getPublishYear());
        response.setDescr(book.getDescr());
        response.setRoom(book.getRoom());
        response.setGenreId(book.getGenre().getId());
        response.setPublisherId(book.getPublisher().getId());
        response.setPageCount(book.getPageCount());
        response.setPlacing(book.getPlacing());
        response.setType(book.getType());
        response.setAuthorsId(book.getAuthors());

        return response;
    }


    @Override
    public List<BookResponse> findByGenreResponse(long id) {
        return getRepository().findByGenre(id).stream()
                .map(this::bookToBookResponse)
                .collect(Collectors.toList());
    }


    @Override
    public List<BookResponse> findByPublisherResponse(long id) {
        return getRepository().findByPublisher(id).stream()
                .map(this::bookToBookResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponse> findByAuthorResponse(long id) {
        List<BookResponse> booksByAuthor = new ArrayList<>();
        idOfBooksByAuthorRepository.getIdOfBooks(id)
                .forEach(bookId -> booksByAuthor.add(BookResponse.
                        of(getRepository().findById(bookId).get())));
        return booksByAuthor;
    }


    @Override
    public List<BookResponse> findAllResponse() {
        return getRepository().findAll().stream()
                .map(this::bookToBookResponse)
                .collect(Collectors.toList());
    }


    @Override
    public List<BookResponse> findByCharacterResponse(String character) {
        return getRepository().findByCharacter(character.charAt(0)).stream()
                .map(this::bookToBookResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponse> findByTitleResponse(String title) {
        return getRepository().findByName(title).stream()
                .map(this::bookToBookResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponse> findByPlacingResponse(String room, String placing) {
        return getRepository().findByPlacing(Room.stringToEnum(room), placing).stream()
                .map(this::bookToBookResponse)
                .collect(Collectors.toList());
    }


    @Override
    public Optional<BookResponse> findByIdResponse(Long id) {
        return getRepository().findById(id).map(this::bookToBookResponse);
    }


    @Override
    @Transactional
    public void saveFromRequest(Book book, BookRequest bookRequest) {
        if (bookRequest.getImage() != null) {
            book.setImage(Base64.getDecoder().decode(bookRequest.getImage()));
        }
        Integer values[] = bookRequest.getAuthorsId();
        if (book.getId() == null) {
            for (int i = 0; i < values.length; ++i) {
                book.addAuthor(authorService.findById((long) values[i]).orElse(null));
                getRepository().save(book);
            }
        } else {
            this.deleteRelationshipBetweenBooksAndAuthor(book.getId());
            getRepository().save(book);
        }
    }

    @Override
    public void deleteRelationshipBetweenBooksAndAuthor(long idOfBook) {
        jdbcTemplate.update("delete  from library.bookauthor where bookid = ?", idOfBook);

    }

    @Override
    @Transactional
    public void insertRelationshipBetweenBookAndAuthor(long idOfAuthor, long idOfBook) {
        jdbcTemplate.update("INSERT INTO library.bookauthor (authorid, bookid) values (?,?)", idOfAuthor, idOfBook);
    }

    @Override
    public void deleteBook(BookRequest bookRequest) {
        jdbcTemplate.update("delete  from library.bookauthor where bookid = ?", bookRequest.getId());
        jdbcTemplate.update("delete from library.book where id = ?", bookRequest.getId());
    }

    @Override
    @Transactional
    public void updateFromRequest(Long id, BookRequest bookRequest) {
        Book book = findById(id).orElse(null);
        book.setName(bookRequest.getName());
        book.setGenre(genreService.getOne(bookRequest.getGenreId()));
        this.deleteRelationshipBetweenBooksAndAuthor(book.getId());
        for(int authorId: bookRequest.getAuthorsId())
            book.addAuthor(authorService.getOne(Long.valueOf(authorId)));
        book.setPublisher(publisherService.getOne(bookRequest.getPublisherId()));
        book.setIsbn(bookRequest.getIsbn());
        book.setDescr(bookRequest.getDescr());
        if (bookRequest.getImage() != null) {
            book.setImage(Base64.getDecoder().decode(bookRequest.getImage()));
        }
        book.setPageCount(bookRequest.getPageCount());
        book.setPublishYear(book.getPublishYear());
        book.setRoom(bookRequest.getRoom());
        book.setType(bookRequest.getType());
        book.setPlacing(bookRequest.getPlacing());
        getRepository().save(book);
    }


}
