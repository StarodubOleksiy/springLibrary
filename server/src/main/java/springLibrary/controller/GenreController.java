package springLibrary.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springLibrary.entities.Book;
import springLibrary.entities.Genre;
import springLibrary.model.request.AuthorRequest;
import springLibrary.model.request.GenreRequest;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.GenreResponse;
import springLibrary.service.BookService;
import springLibrary.service.GenreService;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class GenreController {

    @Autowired
    private GenreService genreService;

    private static final Logger LOGGER = LoggerFactory.getLogger(GenreController.class);


    @GetMapping("/booksbygenres")
    public ResponseEntity<List<GenreResponse>> genres() {
        return new ResponseEntity<>(genreService.findAllResponse(), HttpStatus.OK);

    }


    @PostMapping("/addgenre/save")
    ResponseEntity<?> save(@RequestBody GenreRequest genreRequest) {
        genreService.saveFromRequest(genreRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("genre/{id}")
    public ResponseEntity<?> configure(@PathVariable Long id) {
        return genreService.findByIdResponse(id)
                .map(genre -> new ResponseEntity<Object>(genre, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<Object>("Incorrect genre id", HttpStatus.BAD_REQUEST));
    }


    @DeleteMapping("/genre/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        genreService.deleteGenre(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/genres/update/")
    public ResponseEntity<?> update(@RequestBody GenreRequest genreRequest) {
        genreService.updateFromRequest(genreRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
