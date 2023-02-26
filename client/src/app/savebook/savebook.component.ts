import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import { Book } from '../model/book';
import { Genre } from '../model/genre';
import { BookService } from '../book.service';
import { AuthorService } from '../author.service';
import { GenreService } from '../genre.service';
import { Author } from '../model/author';
import { Publisher } from '../model/publisher';
import { PublisherService } from '../publisher.service';


@Component({
  selector: 'app-savebook',
  templateUrl: './savebook.component.html',
  styleUrls: ['./savebook.component.css']
})
export class SavebookComponent implements OnInit {

  loadedBook: Book;
  book : Book;
  genres: Genre[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
 room = [
    {name: 'FIRSTROOM'},
    {name: 'SECONDROOM'},
    {name: 'THIRDROOM'},
    {name: 'KITCHEN'},
  ];

  type = [
    {name: 'BOOK'},
    {name: 'CDROM'},
    {name: 'MAGAZINE'},
    {name: 'PCHDD'},
  ];


  configureType: ConfigureType;

  bookConfigureForm = new FormGroup({
    name: new FormControl('', [
        Validators.required,
    ]),
   isbn: new FormControl('', [Validators.required,]),
   publishYear: new FormControl('', [Validators.required,]),
   descr: new FormControl('', [Validators.required,]),
   room: new FormControl('', [Validators.required,]),
   type: new FormControl('', [Validators.required,]),
   genre: new FormControl('', [Validators.required,]),
   author: new FormControl('', [Validators.required,]),
   publisher: new FormControl('', [Validators.required,]),
   pageCount: new FormControl('', [Validators.required,]),
   placing: new FormControl('', [Validators.required,])

});



  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private bookServise : BookService,
    private genreService: GenreService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private route: ActivatedRoute) {
}

  ngOnInit() {
    
     if (this.route.snapshot.paramMap.get('configureType') === 'edit') {
      this.configureType = new ConfigureType('edit', SaveBookConfigureType.EDIT);
      this.loadBook();
      this.getGenres();
      this.getAuthors();
      this.getPublishers();
              
    } else {
      this.configureType = new ConfigureType('add', SaveBookConfigureType.ADD);
      this.book = new Book();
      this.loadedBook = new Book();
      this.getGenres();
      this.getAuthors();
      this.getPublishers();
            }  
      
  }


  publishersArray(): void {
    // console.log(this.array.toString());
   console.log("this.publishers.length = "+this.publishers.length);
  }


  loadBook(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.bookServise.getBook(id)
        .subscribe(book => {
            this.loadedBook = book;
            this.book = book.clone();
            
        });
      
}


  getGenres(): void {
     this.genreService.getGenres()
        .subscribe(genres => this.genres = genres);
        console.log("genres.size() = "+this.genres.length);
        
}


getAuthors(): void {
  this.authorService.getAuthors()
     .subscribe(authors => this.authors = authors);
     console.log("authors.size() = "+this.authors.length);
     
}

getPublishers(): void {
  this.publisherService.getPublishers()
     .subscribe(publishers => this.publishers = publishers);
     console.log("publishers.size() = "+this.publishers.length);
     
}


addNewGenre(): void {
    console.log(this.router);
 if (this.route.snapshot.paramMap.get('configureType') === 'add')    
this.router.navigateByUrl('/addgenre/add');
else
this.router.navigateByUrl('/addgenre/'+this.book.id+'/add');
}



addNewAuthor(): void {
  console.log(this.router);
if (this.route.snapshot.paramMap.get('configureType') === 'add')    
this.router.navigateByUrl('/addauthor/add');
else
this.router.navigateByUrl('/addauthor/'+this.book.id+'/add');
}


addNewPublisher(): void {
  console.log(this.router);
if (this.route.snapshot.paramMap.get('configureType') === 'add')    
this.router.navigateByUrl('/addpublisher/add');
else
this.router.navigateByUrl('/addpublisher/'+this.book.id+'/add');
}




saveBook(): void {
  if (this.configureType.type === SaveBookConfigureType.ADD) {
    this.bookServise.saveBook(this.book).subscribe((response: HttpResponse<any>) => {
      this.snackBar.open('Нова книжка успішно додана.', null, {
        duration: 2000
    });
    this.router.navigate(['books']);
  }, error => {
    this.snackBar.open('Ви ввлени неправильно дані. Перевірте і повторіть спробу'
        , error.status, {
            duration: 2000
        });
      }); 

} else
{
  this.bookServise.updateBook(this.book).subscribe((response: HttpResponse<any>) => {
    this.snackBar.open('Нова книжка успішно відредагована.', null, {
      duration: 2000
  });
  this.router.navigate(['books']);
}, error => {
  this.snackBar.open('Ви ввлени неправильно дані. Перевірте і повторіть спробу'
      , null, {
          duration: 2000
      });
    });
}
}


onFileChange(event) {
  let reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.book.image = reader.result.split(',')[1];
      };
  }
}



}


export enum SaveBookConfigureType {
  EDIT, ADD
}

class ConfigureType {
  constructor(public text: string, public type: SaveBookConfigureType) {
  }
}
