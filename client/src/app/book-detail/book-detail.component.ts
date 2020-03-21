import { Component, OnInit , Input} from '@angular/core';
import { Book } from '../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookService }  from '../book.service';
import { Genre } from '../model/genre';
import { Publisher } from '../model/publisher';
import { GenreService } from '../genre.service';
import { PublisherService } from '../publisher.service';
import { Author } from '../model/author';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

    loadedBook: Book;
    book: Book;
    genre: Genre;
    publisher: Publisher;
    authors: Author[] = [];

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService,
    private publisherService: PublisherService,
    private location: Location,
    private authorService: AuthorService    
) { }

  ngOnInit() {
    this.getBook();
    
    console.log("book is: "+this.book.id);
   // console.log("genre is: "+this.genre.name)
  }

  getBook(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
         this.bookService.getBook(id)
            .subscribe(book => {
                 this.book = book;
                 this.getGenre();
                 this.getPublisher();
                 this.getAuthors();
            });
    }


    getGenre(): void {
           this.genreService.getGenre(this.book.genreId)
              .subscribe(genre => {
                   this.genre = genre;
              });
      } 

      getPublisher(): void {
        this.publisherService.getPublisher(this.book.publisherId)
           .subscribe(publisher => {
                this.publisher = publisher;
           }); 
   
          } 

   
       getAuthors(): void {
        console.log("etAuthors() book.id = "+this.book.id);    
            this.authorService.getAuthorsByBook(this.book.id)
               .subscribe(authors => this.authors = authors);
               console.log("authors.size() = "+this.authors.length);               
          }

 
  goBack(): void {
    this.location.back();
  }



}
