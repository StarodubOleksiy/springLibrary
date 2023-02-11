package springLibrary.service;

import springLibrary.entities.Author;
import springLibrary.entities.Book;
import springLibrary.model.request.AuthorRequest;
import springLibrary.model.request.BookRequest;
import springLibrary.model.response.AuthorResponse;
import springLibrary.repository.AuthorRepository;

import java.util.List;
import java.util.Optional;

public interface AuthorService  extends Service<Author, Long, AuthorRepository> {

    public List<AuthorResponse> findByAuthorsByName(String name);

    public List<AuthorResponse> findAllResponse();

    public void saveFromRequest(AuthorRequest authorRequest);

    public Optional<AuthorResponse> findByIdResponse(Long id);

    public void deleteRelationshipBetweenBooksAndAuthor(long idOfAuthor);

    public void insertRelationshipBetweenBookAndAuthor(long idOfAuthor, long idOfBook);

    public List<AuthorResponse> findByCharacterResponse(String character);

    public List<AuthorResponse> findByBookResponse(long id);

    public void updateFromRequest(AuthorRequest authorRequest);

    public void deleteAuthor(Long id);

}
