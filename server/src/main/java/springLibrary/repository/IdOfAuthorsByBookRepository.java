package springLibrary.repository;

import java.util.List;

public interface IdOfAuthorsByBookRepository {

    public List<Long> getIdOfAuthors(long id);
}
