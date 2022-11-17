package springLibrary.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springLibrary.entities.Author;
import springLibrary.entities.Genre;
import springLibrary.entities.Publisher;
import springLibrary.model.request.*;
import springLibrary.model.response.AuthorResponse;
import springLibrary.model.response.BookResponse;
import springLibrary.model.response.PublisherResponse;
import springLibrary.service.GenreService;
import springLibrary.service.PublisherService;

import java.util.Collections;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class PublisherController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthorController.class);

    @Autowired
    private PublisherService publisherService;


        @GetMapping("/booksbypublisher")
    public ResponseEntity<List<PublisherResponse>> publishers() {
            List<PublisherResponse> publishersList = publisherService.findAllResponse();
            Collections.sort(publishersList);
        return new ResponseEntity<>(publishersList, HttpStatus.OK);

    }


    @GetMapping("publisher/{id}")
    public ResponseEntity<?> configure(@PathVariable Long id) {
          return publisherService.findByIdResponse(id)
                .map(publisher -> new ResponseEntity<Object>(publisher, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<Object>("Incorrect publisher id", HttpStatus.BAD_REQUEST));
    }

    @PostMapping("/addpublisher/save")
    ResponseEntity<?> save(@RequestBody PublisherRequest publisherRequest) {
        Publisher publisher = publisherRequest.toPublisher();
        publisherService.save(publisher);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/publisher/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        publisherService.deletePublisher(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/publisher/findbycriteria")
    public ResponseEntity<List<PublisherResponse>> findPublishers(@RequestBody PublisherSearchCreateria publisherSearchCreateria) {
       LOGGER.info("publisherSearchCreateria.toString() = "+publisherSearchCreateria.toString());
        if (publisherSearchCreateria.isFindByCity() == false)
            return new ResponseEntity<>(publisherService.findByNameResponse(publisherSearchCreateria.getSearchWord()), HttpStatus.OK);
        else
            return new ResponseEntity<>(publisherService.findByCityResponse(publisherSearchCreateria.getSearchWord()), HttpStatus.OK);
    }


    @GetMapping("publisher/findbycharacter")
    public List<PublisherResponse> getPublisherByCharacter(@RequestParam("character") String character) {
        return publisherService.findByCharacterResponse(character);
    }

    @PutMapping("/publishers/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody PublisherRequest publisherRequest) {
        LOGGER.info("publisher id = " + id);
        LOGGER.info("publisherRequest = " + publisherRequest);
        publisherService.updateFromRequest(id,publisherRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
