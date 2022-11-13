import { Injectable } from '@angular/core';
import { Genre } from './model/genre';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class GenreService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
 private genreUrl = environment.apiUrl;   // URL to web api
 //private booksUrl = '/books';
 //private booksUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

 
  saveGenre(genre: Genre): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
        this.genreUrl + 'addgenre/save', genre, {observe: 'response'});
}


getGenres(): Observable<Genre[]> {
  return this.http.get<Genre[]>(this.genreUrl + '/booksbygenres');
}


getGenre(id: number): Observable<Genre> {
   console.log('is this function working?');
  console.log(this.genreUrl + 'genre/' + id);
  return this.http.get<Genre>(this.genreUrl + 'genre/' + id).map(json => {
    return Genre.copyOf(json);
  });
   
}


deleteGenre(genre: Genre): Observable<HttpResponse<any>> {
  return this.http.post<HttpResponse<any>>(
    this.genreUrl + '/genre/delete', genre, {observe: 'response'});
}

deleteGenreNewVersion(genre: Genre): Observable<Genre> {
  const url = `${this.genreUrl + '/genre/delete'}/${genre.id}`;
  return this.http.delete<Genre>(url, this.httpOptions).pipe(
    tap(_ => console.log(`deleted genre id=${genre.id}`)),
    catchError(this.handleError<Genre>('delete Genre'))
  );
}


updateGenre(genre: Genre): Observable<HttpResponse<any>> {
  return this.http.put<HttpResponse<any>>(
      this.genreUrl + '/genres/update/'+genre.id, genre, {observe: 'response'});
} 
 


private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return Observable.of(result as T);
  };
}

}
