package springLibrary.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springLibrary.entities.Author;
import springLibrary.entities.Genre;
import springLibrary.model.request.AuthorRequest;
import springLibrary.model.request.BookRequest;
import springLibrary.model.request.GenreRequest;
import springLibrary.model.response.AuthorResponse;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.GenreResponse;
import springLibrary.service.AuthorService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthorController.class);


    @GetMapping("/authors")
    public ResponseEntity<List<AuthorResponse>> authors() {
        return new ResponseEntity<>(authorService.findAllResponse(), HttpStatus.OK);

    }


    @PostMapping("/addauthor/save")
    ResponseEntity<?> save(@RequestBody AuthorRequest authorRequest) {
        authorService.saveFromRequest(authorRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("author/{id}")
    public ResponseEntity<?> getAuthorById(@PathVariable Long id) {
        return authorService.findByIdResponse(id)
                .map(author -> new ResponseEntity<Object>(author, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<Object>("Incorrect author id", HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/author/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        authorService.deleteAuthor(id);
        return authorService.findByIdResponse(id)
                .map(author -> new ResponseEntity<Object>(author, HttpStatus.BAD_REQUEST))
                .orElseGet(() -> new ResponseEntity<Object>("Author deleted successfully", HttpStatus.NO_CONTENT));

    }

    @GetMapping("/author/findbyname")
    public List<AuthorResponse> getAuthorsByName(@RequestParam("name") String name) {
        return authorService.findByAuthorsByName(name);
    }

    @GetMapping("author/findbycharacter")
    public List<AuthorResponse> getAuthorByCharacter(@RequestParam("character") String character) {
        return authorService.findByCharacterResponse(character);
    }

    @GetMapping("getbybook/{id}")
    public List<AuthorResponse> getAuthorsByBook(@PathVariable Long id) {
        return authorService.findByBookResponse(id);
    }


    @PutMapping("/authors/update/")
    public ResponseEntity<?> update(@RequestBody AuthorRequest authorRequest) {
        LOGGER.info("bookRequest = " + authorRequest);
        authorService.updateFromRequest(authorRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
