package springLibrary.service;

import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.entities.Publisher;
import springLibrary.model.request.GenreRequest;
import springLibrary.model.request.PublisherRequest;
import springLibrary.model.response.AuthorResponse;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.GenreResponse;
import springLibrary.model.response.PublisherResponse;
import springLibrary.repository.PublisherRepository;

import java.util.List;
import java.util.Optional;

public interface PublisherService extends Service<Publisher, Long, PublisherRepository> {

    public List<PublisherResponse> findAllResponse();

    public Optional<PublisherResponse> findByIdResponse(Long id);

    public void save(Publisher publisher);

    public List<Publisher> findByName(String name);

    public List<PublisherResponse> findByNameResponse(String title);

    public List<Publisher> findByCity(String name);

    public List<PublisherResponse> findByCityResponse(String city);

    public List<PublisherResponse> findByCharacterResponse(String character);

    public void updateFromRequest(Long id, PublisherRequest publisherRequest);

    public void deletePublisher(Long id);

}
