package springLibrary.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springLibrary.entities.Author;
import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.model.request.BookRequest;
import springLibrary.model.request.CriteriaRequest;
import springLibrary.model.request.GenreRequest;
import springLibrary.model.response.BookResponse;
import springLibrary.service.AuthorService;
import springLibrary.service.BookService;
import springLibrary.service.GenreService;
import springLibrary.service.PublisherService;


import java.util.*;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private PublisherService publisherService;

    private static final Logger LOGGER = LoggerFactory.getLogger(BookController.class);


    @GetMapping("books")
    public ResponseEntity<List<BookResponse>> books() {
        return new ResponseEntity<>(bookService.findAllResponse(), HttpStatus.OK);
    }


    @GetMapping("books/{id}")
    public ResponseEntity<?> configure(@PathVariable Long id) {
        return bookService.findByIdResponse(id)
                .map(book -> new ResponseEntity<Object>(book, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<Object>("Incorrect book id", HttpStatus.BAD_REQUEST));
    }

    @GetMapping("book/findbyname")
    public List<Book> getBookByName() {
        return bookService.findByName("Melovoy chelovek");
    }


    @GetMapping("book/findbycharacter")
    public List<BookResponse> getBookByCharacter(@RequestParam("character") String character) {
        return bookService.findByCharacterResponse(character);
    }


    @PostMapping("book/findbycriteria")
    public ResponseEntity<List<BookResponse>> findBooks(@RequestBody CriteriaRequest criteriaRequest) {
        LOGGER.info("criteriaRequest.toString() = " + criteriaRequest.toString());
        if (criteriaRequest.getType() == null)
            return new ResponseEntity<>(bookService.findByTitleResponse(criteriaRequest.getSearchWord()), HttpStatus.OK);
        else
            return new ResponseEntity<>(bookService.findByPlacingResponse(criteriaRequest.getType(), criteriaRequest.getSearchWord()), HttpStatus.OK);
    }


    @GetMapping("getbygenre/{id}")
    public List<BookResponse> findByGenreBooks(@PathVariable Long id) {
        List<BookResponse> booksByGenre = bookService.findByGenreResponse(id);
        Collections.sort(booksByGenre);
        return booksByGenre;

    }


    @GetMapping("getbypublisher/{id}")
    public List<BookResponse> getBooksByPublisher(@PathVariable Long id) {
        return bookService.findByPublisherResponse(id);
    }


    @GetMapping("getbyauthor/{id}")
    public List<BookResponse> getBooksByAuthor(@PathVariable Long id) {
        return bookService.findByAuthorResponse(id);
    }

    @PostMapping("books/save")
    public ResponseEntity<?> save(@RequestBody BookRequest bookRequest) {
        bookService.saveFromRequest(bookRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/books/update/")
    public ResponseEntity<?> update(@RequestBody BookRequest bookRequest) {
        LOGGER.info("bookRequest = " + bookRequest);
        bookService.updateFromRequest(bookRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/book/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
