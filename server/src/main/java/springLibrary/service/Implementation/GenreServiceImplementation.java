package springLibrary.service.Implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springLibrary.entities.Author;
import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.model.request.AuthorRequest;
import springLibrary.model.request.GenreRequest;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.GenreResponse;
import springLibrary.repository.GenreRepository;
import springLibrary.service.AbstractService;
import springLibrary.service.GenreService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GenreServiceImplementation extends AbstractService<Genre, Long, GenreRepository> implements GenreService {


    protected GenreServiceImplementation(@Autowired GenreRepository repository) {
        super(repository);
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(GenreServiceImplementation.class);


    private GenreResponse genreToGenreResponse(Genre genre) {
        GenreResponse response = new GenreResponse();
        response.setId(genre.getId());
        response.setName(genre.getName());
        return response;
    }


    @Override
    public List<GenreResponse> findAllResponse() {
        return getRepository().findAll().stream()
                .map(this::genreToGenreResponse)
                .collect(Collectors.toList());
    }


    @Override
    public Optional<GenreResponse> findByIdResponse(Long id) {
        return getRepository().findById(id).map(this::genreToGenreResponse);
    }

    @Override
    @Transactional
    public void saveFromRequest(GenreRequest genreRequest) {
        Genre genre = genreRequest.toGenre();
        super.save(genre);
    }


    @Override
    @Transactional
    public void updateFromRequest(GenreRequest genreRequest) {
        Genre genre = findById(genreRequest.getId()).orElse(null);
        genreRequest.setGenreFromRequest(genre);
        getRepository().save(genre);
    }

    @Override
    @Transactional
    public void deleteGenre(Long id) {
        getRepository().deleteById(id);
    }

}
