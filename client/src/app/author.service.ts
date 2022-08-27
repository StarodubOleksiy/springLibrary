import { Injectable } from '@angular/core';
import { Author } from './model/author';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthorService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  private authorUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }




  getAuthors(): Observable<Author[]> {
      console.log("getAuthors(): Observable<Author[]> = "+this.authorUrl + '/authors');
      return this.http.get<Author[]>(this.authorUrl + 'authors');
    }


    saveAuthor(author: Author): Observable<HttpResponse<any>> {
      console.log("author.name: "+author.name);
      return this.http.post<HttpResponse<any>>(
          this.authorUrl + 'addauthor/save', author, {observe: 'response'});
  }
    
    
    getAuthor(id: number): Observable<Author> {
      return this.http.get<Author>(this.authorUrl + 'author/' + id).map(json => {
        return Author.copyOf(json);
      });
       
    }

    
    deleteAuthor(author: Author): Observable<HttpResponse<any>> {
      return this.http.post<HttpResponse<any>>(
        this.authorUrl + '/author/delete', author, {observe: 'response'});
    }

     
    deleteAuthorNewVersion(author: Author): Observable<Author> {
     const url = `${this.authorUrl + '/author/delete'}/${author.id}`;
     return this.http.delete<Author>(url, this.httpOptions)
     .pipe(
       tap(_ => console.log(`deleted author id=${author.id}`)),
       catchError(this.handleError<Author>('delete Author'))
     );
   }


   updateAuthor(author: Author): Observable<any> {
    return this.http.put(this.authorUrl+'update/' + author.id, author, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated author id=${author.id}`)),
      catchError(this.handleError<any>('update Author'))
    );
  }
   

    getAuthorsByName(name: string): Observable<Author[]> {
      return this.http.get<Author[]>(this.authorUrl+'/author/findbyname',
          {
              params: {
                name: name
                      }
          });
    }


    getAuthorsByCharacter(character: string): Observable<Author[]> {

      return this.http.get<Author[]>(this.authorUrl+'author'+'/findbycharacter',
          {
              params: {
                  character: character
                      }
          });
    }


    getAuthorsByBook(id: number): Observable<Author[]> {
     return this.http.get<Author[]>(this.authorUrl + 'getbybook/'+id);    
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
