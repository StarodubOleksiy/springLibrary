import { Injectable } from '@angular/core';
import { Genre } from './model/genre';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import  "rxjs/add/operator/map" ;
import 'rxjs/add/operator/catch';


@Injectable()
export class GenreService {

  
 private genreUrl = environment.apiUrl;   // URL to web api
 //private booksUrl = '/books';
 //private booksUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

 
  saveGenre(genre: Genre): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
        this.genreUrl + 'addgenre/save', genre, {observe: 'response'});
}
/*
  savePublisher(publisher: Publisher): Observable<HttpResponse<any>> {
     return this.http.post<HttpResponse<any>>(
         this.publisherUrl + 'addpublisher/save', publisher, {observe: 'response'});
 }
*/


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









}
