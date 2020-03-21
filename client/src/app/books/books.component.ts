import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Genre } from '../model/genre';
import { BookService } from '../book.service';
import { GenreService } from '../genre.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { SearchCreateria } from '../SearchCreateria';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public selectedId:number;
  public url:string;
  books: Book[] = [];
  genres: Genre[] ; 
  returnedGenres: Genre[] = [] ; 
  genre: Genre;
  returnedBooks: Book[]  = [];
  searchType: string;
  room = [
    {name: 'FIRSTROOM'},
    {name: 'SECONDROOM'},
    {name: 'THIRDROOM'},
    {name: 'KITCHEN'},
  ];

  searchcreateria: SearchCreateria;
  searchForm = new FormGroup({
        search: new FormControl('', [
        Validators.required
    ]),
    type: new FormControl(false),
    createria: new FormControl('', [Validators.required,]
  )
 })
 findByPlace = new FormControl();


checkingSearch() {
  console.log("Fumction on change"+this.findByPlace.value);
  if( this.findByPlace.value === true)
    this.searchType ="Знайти за допомогою заголовка книги";  
  else 
  this.searchType ="Знайти за допомогою місця розташування книги"; 
} ;
  

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private genreService: GenreService,
    public snackBar: MatSnackBar,
   
  ) { 

    }

  ngOnInit() {
    //console.log('this.route.snapshot.paramMap.get(id) = method ngOnInit() '+this.route.snapshot.paramMap.get('id'));
    console.log('method ngOnInit()');
    console.log('this.route.toString() = '+this.route.toString());
  if(this.route.toString().includes("author"))
  console.log('==============includes=================');
  else
  console.log('==============not  includes=================');
  console.log('this.route.snapshot.queryParams["firstLetterOfTitle"]: '+this.route.snapshot.queryParams["firstLetterOfTitle"]);
    if(this.route.snapshot.queryParams["firstLetterOfTitle"] === undefined)
  console.log('this.url = '+this.url);
    console.log('this.route = this.route.snapshot.toString = '+this.route.snapshot.toString());
    this.selectedId = parseInt(this.route.snapshot.paramMap.get('id'));
     if(isNaN(this.selectedId) === true)
     {      
      this.router.navigate(['/books']);
      if(this.route.snapshot.queryParams["firstLetterOfTitle"] === undefined)
     this.getBooks();
     else 
     this.findByCharacter(this.route.snapshot.queryParams["firstLetterOfTitle"]);
      }
     else if(this.route.toString().includes("author"))
     {
      console.log('==============includes author=================');
      this.getBooksByAuthor(this.selectedId);
     } 
     else if(this.route.toString().includes("publisher"))
     {
      this.getBooksByPublisher(this.selectedId);
     // console.log('==============includes publisher=================');
     } 
     else {
     this.getBooksByGenre(this.selectedId);        
     }
    this.getGenres();
    this.searchcreateria = new SearchCreateria();
    this.searchType ="Знайти за допомогою місця розташування книги";
    console.log('thisBooks.length = '+this.books.length)
    console.log('this.returnedBooks.length = '+this.returnedBooks.length)       
  }

  refresh(): void {
     if(this.selectedId === undefined)
     this.getBooks();
     else
     this.getBooksByGenre(this.selectedId);
  }


  getBooks(): void {
    this.bookService.getBooks()
    .subscribe(books => 
      { this.books = books.body;
        this.returnedBooks = this.books.slice(0, 10);
      });
 
  }

  searchBook(): void {
    this.bookService.getBooksByCriteria(this.searchcreateria)
    .subscribe(books => 
      { this.books = books.body;
        this.returnedBooks = this.books.slice(0, 10);
      });
  }


  onSelect(genre) {
    console.log('this.route.snapshot.paramMap.get(id) = method onSelect(genre) '+this.route);//From here you can extract by author and by publisher
     this.selectedId = genre.id;
  this.bookService.getBooksByGenre(this.selectedId)
   .subscribe(books => 
    { 
      this.books = books.body;
      this.returnedBooks = this.books.slice(0, 10);
      this.router.navigate(['booksbygenre/:' + this.selectedId]);     
     });
     this.returnedBooks = this.books.slice(0, 10); 
 
}


getGenres(): void {
  this.bookService.getGenres()
 .subscribe(genres => 
   {
     this.genres = genres.body;
     this.returnedGenres = this.genres.slice(0, 10);
    });
}


getBooksByGenre(id:number): void {
  console.log('this.route.snapshot.paramMap.get(id) = method getBooksByGenre(id:number)'+this.route.snapshot.paramMap.get('id'));
    this.bookService.getBooksByGenre(id)
   .subscribe(books => 
    { 
      this.books = books.body;
      this.returnedBooks = this.books.slice(0, 10);
      this.router.navigate(['booksbygenre/:' + this.selectedId]);     
     });

}

getBooksByPublisher(id:number): void {
  console.log('this.route.snapshot.paramMap.get(id) = method getBooksByPublisher(id:number)'+this.route.snapshot.paramMap.get('id'));
    this.bookService.getBooksByPublisher(id)
   .subscribe(books => 
    { 
      this.books = books.body;
      this.returnedBooks = this.books.slice(0, 10);
      this.router.navigate(['books/publisher/' + this.selectedId]);     
     });
}

getBooksByAuthor(id:number): void {
  console.log('this.route.snapshot.paramMap.get(id) = method getBooksByPublisher(id:number)'+this.route.snapshot.paramMap.get('id'));
    this.bookService.getBooksByAuthor(id)
   .subscribe(books => 
    { 
      this.books = books.body;
      this.returnedBooks = this.books.slice(0, 10);
      this.router.navigate(['books/author/' + this.selectedId]);     
     });
}

editGenre(id: number) : void {
  this.router.navigateByUrl('/addgenre/edit/' + id);
}




editBook(id: number) : void {
  this.router.navigateByUrl('/savebook/edit/' + id);
}


addNewBook() :void {
  this.router.navigateByUrl('/savebook/add');
}


onGenreDeleteClick(genre: Genre): void {
  var deleteConfirmation = confirm('Ви впевнені що хочете видалити цей жанр?');
  if (deleteConfirmation)  
  this.genreService.deleteGenre(genre)
              .subscribe(response => this.onDeleteGenreResponse(genre, response)
              , error => {
                this.snackBar.open('Genre cannot be deleted. It is not empty and has books.'
                    , null, {
                        duration: 2000
                    });
            });
              this.getBooks();
}

private onDeleteGenreResponse(genre: Genre, response: HttpResponse<any>): void {
  if (response.status === HttpStatus.OK) {
      this.snackBar.open('Genre deleted sucsessfully.', null, {
          duration: 2000
      });
      let index = this.genres.indexOf(genre);
      this.genres.splice(index, 1);
  }
}


onBookDeleteClick(book: Book): void {
  var deleteConfirmation = confirm('Ви впевнені що хочете видалити дану книжку');
  if (deleteConfirmation)  
  this.bookService.deleteBook(book)
              .subscribe(response => this.onDeleteBookResponse(book, response));
      
}

private onDeleteBookResponse(book: Book, response: HttpResponse<any>): void {
  if (response.status === HttpStatus.OK) {
      this.snackBar.open('Book deleted sucsessfully.', null, {
          duration: 2000
      });
      let index = this.books.indexOf(book);
      this.books.splice(index, 1);
      this.returnedBooks.splice(index, 1);
  }
}


pageChanged(event: PageChangedEvent): void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
   this.returnedBooks = this.books.slice(startItem, endItem);
}

pageGenreChanged(event: PageChangedEvent): void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
   this.returnedGenres = this.genres.slice(startItem, endItem);
}


findByCharacter(character:string):void 
{
  console.log('method findByCharacter : this.route.snapshot.toString() = '+this.route.snapshot.toString());
  this.router.navigate(['books/'],
    {
        queryParams: {
            firstLetterOfTitle: character
        }
    }
);
  this.bookService.getBookByCharacter(character)
  .subscribe(books => 
    { 
      this.books = books;
      this.returnedBooks = this.books.slice(0, 10);        
     });
 }



}
