package springLibrary.service.Implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.entities.Publisher;
import springLibrary.model.response.AuthorResponse;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.GenreResponse;
import springLibrary.model.response.PublisherResponse;
import springLibrary.repository.PublisherRepository;
import springLibrary.service.AbstractService;
import springLibrary.service.PublisherService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class PublisherServiceImplementation extends AbstractService<Publisher, Long, PublisherRepository> implements PublisherService {

    protected PublisherServiceImplementation(@Autowired PublisherRepository repository) {
        super(repository);
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(PublisherServiceImplementation.class);

    private PublisherResponse publisherToPublisherResponse(Publisher publisher) {
        PublisherResponse response = new PublisherResponse();
        response.setId(publisher.getId());
        response.setName(publisher.getName());
        response.setCity(publisher.getCity());
        return response;
    }



    @Override
    public Optional<PublisherResponse> findByIdResponse(Long id) {
        return getRepository().findById(id).map(this::publisherToPublisherResponse);
    }


    @Override
    public List<PublisherResponse> findAllResponse() {
        return getRepository().findAll().stream()
                .map(this::publisherToPublisherResponse)
                .collect(Collectors.toList());
    }


    public void save(Publisher publisher) {
        if(publisher.getId() == 0)
            super.save(publisher);
        else {
            if (getRepository().getOne(publisher.getId()).getBooks() != null) ;
            publisher.setBooks(getRepository().getOne(publisher.getId()).getBooks());
            super.save(publisher);
        }

    }

    @Override
    public List<PublisherResponse> findByNameResponse(String name) {
        return getRepository().findByName(name).stream()
                .map(this::publisherToPublisherResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PublisherResponse> findByCityResponse(String city) {
        return getRepository().findByCity(city).stream()
                .map(this::publisherToPublisherResponse)
                .collect(Collectors.toList());
    }


    @Override
    public List<Publisher> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<Publisher> findByCity(String name) {
        return repository.findByCity(name);
    }

    @Override
    public List<PublisherResponse> findByCharacterResponse(String character) {
        return getRepository().findByCharacter(character.charAt(0)).stream()
                .map(this::publisherToPublisherResponse)
                .collect(Collectors.toList());
    }


}
