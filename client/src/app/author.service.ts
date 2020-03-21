import { Injectable } from '@angular/core';
import { Author } from './model/author';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import  "rxjs/add/operator/map" ;
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthorService {


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
    //  return this.http.get<HttpResponse<Author[] | any>>(
     // this.authorUrl+'getbybook/'+id , {observe: 'response'});
     return this.http.get<Author[]>(this.authorUrl + 'getbybook/'+id);
    
    }

    /*
      getAuthors(): Observable<Author[]> {
      console.log("getAuthors(): Observable<Author[]> = "+this.authorUrl + '/authors');
      return this.http.get<Author[]>(this.authorUrl + 'authors');
    }
    */



}
