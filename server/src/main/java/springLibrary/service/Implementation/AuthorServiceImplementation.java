package springLibrary.service.Implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import springLibrary.entities.Author;
import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.model.request.AuthorRequest;
import springLibrary.model.request.BookRequest;
import springLibrary.model.response.AuthorResponse;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.GenreResponse;
import springLibrary.repository.AuthorRepository;
import springLibrary.repository.IdOfAuthorsByBookRepository;
import springLibrary.repository.IdOfBooksByAuthorRepository;
import springLibrary.service.AbstractService;
import springLibrary.service.AuthorService;
import springLibrary.service.BookService;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthorServiceImplementation extends AbstractService<Author, Long, AuthorRepository> implements AuthorService {

    protected AuthorServiceImplementation(@Autowired AuthorRepository repository) {
        super(repository);
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(BookServiseImplementation.class);

    @Autowired
    BookService bookService;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    IdOfAuthorsByBookRepository idOfAuthorsByBookRepository;

    private AuthorResponse authorToAuthorResponse(Author author) {
        AuthorResponse response = new AuthorResponse();
        response.setId(author.getId());
        response.setName(author.getFio());
        response.setBooksId(author.getBooks());
        return response;
    }


    @Override
    public List<AuthorResponse> findAllResponse() {
        return getRepository().findAll().stream()
                .map(this::authorToAuthorResponse)
                .collect(Collectors.toList());
    }


    @Override
    public Optional<AuthorResponse> findByIdResponse(Long id) {
        return getRepository().findById(id).map(this::authorToAuthorResponse);
    }

    @Override
    @Transactional
    public void saveFromRequest(AuthorRequest authorRequest) {
        Author author = authorRequest.toAuthor();
        if (author.getBooks() == null) {
            author.createBooks();
        }
        if (authorRequest.getBooksId() != null) {
            if (authorRequest.getBooksId().length > 0) {
                this.deleteRelationshipBetweenBooksAndAuthor(authorRequest.getId());
                getRepository().save(author);
                for (int i = 0; i < authorRequest.getBooksId().length; ++i)
                    insertRelationshipBetweenBookAndAuthor(author.getId(), authorRequest.getBooksId()[i]);
            } else
                getRepository().save(author);
        } else
            getRepository().save(author);
    }


    @Override
    public void deleteRelationshipBetweenBooksAndAuthor(long idOfAuthor) {
        jdbcTemplate.update("delete  from library.bookauthor where authorid = ?", idOfAuthor);
    }

    @Override
    public void insertRelationshipBetweenBookAndAuthor(long idOfAuthor, long idOfBook) {
        jdbcTemplate.update("INSERT INTO library.bookauthor (authorid, bookid) values (?,?)", idOfAuthor, idOfBook);
    }

    @Override
    public List<AuthorResponse> findByAuthorsByName(String name) {
        return getRepository().findByFio(name).stream()
                .map(this::authorToAuthorResponse)
                .collect(Collectors.toList());
    }


    @Override
    public List<AuthorResponse> findByCharacterResponse(String character) {
        return getRepository().findByCharacter(character.charAt(0)).stream()
                .map(this::authorToAuthorResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AuthorResponse> findByBookResponse(long id) {
        List<AuthorResponse> authorsByBook = new ArrayList<>();
        idOfAuthorsByBookRepository.getIdOfAuthors(id)
                .forEach(authorId -> authorsByBook.add(AuthorResponse.
                        of(getRepository().findById(authorId).get())));
        Collections.sort(authorsByBook);
        return authorsByBook;
    }


}




