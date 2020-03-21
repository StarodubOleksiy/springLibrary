package springLibrary.repository.implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import springLibrary.repository.IdOfBooksByAuthorRepository;
import springLibrary.service.BookService;

import java.util.ArrayList;
import java.util.List;

@Repository
public class IdOfBooksByAuthorRepositoryImplementation implements IdOfBooksByAuthorRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    private static final Logger LOGGER = LoggerFactory.getLogger(IdOfBooksByAuthorRepositoryImplementation.class);

    @Override
    public List<Long> getIdOfBooks(long id) {
        String sql = "SELECT * FROM library.bookauthor where library.bookauthor.authorid = ?";
        List<Long> result = new ArrayList<>();
        jdbcTemplate.query(sql, new Object[]{id}, (rs, rowNum) ->
                new Long(rs.getLong("bookid")))
                .forEach(response -> result.add(response));
        return result;
    }

}
