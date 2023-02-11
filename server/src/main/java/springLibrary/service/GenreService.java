package springLibrary.service;

import springLibrary.entities.Genre;
import springLibrary.model.request.AuthorRequest;
import springLibrary.model.request.GenreRequest;
import springLibrary.model.response.GenreResponse;
import springLibrary.repository.GenreRepository;

import java.util.List;
import java.util.Optional;

public interface GenreService extends Service<Genre, Long, GenreRepository> {

    public List<GenreResponse> findAllResponse();


    public Optional<GenreResponse> findByIdResponse(Long id);

    public void saveFromRequest(GenreRequest genreRequest);

    public void updateFromRequest(GenreRequest genreRequest);

    public void deleteGenre(Long id);
}
