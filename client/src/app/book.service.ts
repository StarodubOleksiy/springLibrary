import { Injectable } from '@angular/core';
import { Book } from './model/book';
import { Genre } from './model/genre';
import { Publisher } from './model/publisher';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {environment} from '../environments/environment';
import { SearchCreateria } from './SearchCreateria';
import {Router} from '@angular/router';




@Injectable()
export class BookService {

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  


  books: Book[]

 private booksUrl = environment.apiUrl;   // URL to web api
 //private booksUrl = '/books';

  constructor(private http: HttpClient,
    private router: Router) { }

 



  saveBook(book: Book): Observable<HttpResponse<any>> {
  return this.http.post<HttpResponse<any>>(
      this.booksUrl + '/books/save', book, {observe: 'response'});
  }


  updateBook(book: Book): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(
        this.booksUrl + '/books/update/', book, {observe: 'response'});
  } 
  


  getBook(id: number): Observable<Book> {
    console.log('is this function working?');
   console.log(this.booksUrl + 'book/' + id);
   return this.http.get<Book>(this.booksUrl + '/books/' + id).pipe(map(json => {
    return Book.copyOf(json);
  }
  ),
  catchError(this.handleError<Book[] | any>('Book with id=${id} have not found' 
  ))
  )
  }


 getBooks(): Observable<HttpResponse<Book[] | any>> {
      return this.http.get<HttpResponse<Book[] | any>>(
        this.booksUrl+'books' , {observe: 'response'});
  }


  getBooksByGenre(id: number): Observable<HttpResponse<Book[] | any>> {
     return this.http.get<HttpResponse<Book[] | any>>(
     this.booksUrl+'getbygenre/'+id , {observe: 'response'});

}


getBooksByPublisher(id: number): Observable<HttpResponse<Book[] | any>> {
  return this.http.get<HttpResponse<Book[] | any>>(
  this.booksUrl+'getbypublisher/'+id , {observe: 'response'});

}

getBooksByAuthor(id: number): Observable<HttpResponse<Book[] | any>> {
  return this.http.get<HttpResponse<Book[] | any>>(
  this.booksUrl+'getbyauthor/'+id , {observe: 'response'});

}


getBooksByCriteria(criteria: SearchCreateria): Observable<HttpResponse<Book[] | any>> {
  return this.http.post<HttpResponse<Book[] | any>>(
  this.booksUrl+'book/findbycriteria' , criteria,  {observe: 'response'});
}


deleteBook(book: Book): Observable<HttpResponse<any>> {
  return this.http.delete<HttpResponse<any>>(
      this.booksUrl + '/book/delete/'+book.id, {observe: 'response'});
}

getGenres(): Observable<HttpResponse<Genre[] | any>> {
  return this.http.get<HttpResponse<Genre[] | any>>(
    this.booksUrl+'booksbygenres' , {observe: 'response'});
}

getPublishers(): Observable<HttpResponse<Publisher[] | any>> {
  return this.http.get<HttpResponse<Publisher[] | any>>(
    this.booksUrl+'booksbypublisher' , {observe: 'response'});
}


getBookByCharacter(character: string): Observable<Book[]> {

  return this.http.get<Book[]>(this.booksUrl+'book'+'/findbycharacter',
      {
          params: {
              character: character
                  }
      });
}


private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    this.router.navigate(['**']);
    return Observable.of(result as T);
  };
}


}


  