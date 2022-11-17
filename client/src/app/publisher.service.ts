import { Injectable } from '@angular/core';
import { Publisher } from './model/publisher';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { PublisherSearchCreateria } from './PublisherSearchCriteria';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class PublisherService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  
  private publisherUrl = environment.apiUrl;   // URL to web api

   constructor(private http: HttpClient,
   ) { }
 
  
 
   savePublisher(publisher: Publisher): Observable<HttpResponse<any>> {
     return this.http.post<HttpResponse<any>>(
         this.publisherUrl + 'addpublisher/save', publisher, {observe: 'response'});
 }
 

 
 
 getPublishers(): Observable<Publisher[]> {
   console.log("publishers=====================")
   console.log("this.publisherUrl = "+this.publisherUrl)
   return this.http.get<Publisher[]>(this.publisherUrl + '/booksbypublisher');
 }
                                                          
 
 getPublisher(id: number): Observable<Publisher> {
    console.log('is this function working?');
   console.log(this.publisherUrl + 'publisher/' + id);
   return this.http.get<Publisher>(this.publisherUrl + 'publisher/' + id).map(json => {
     return Publisher.copyOf(json);
   });
    
 }
 
 
 deletePublisher(publisher: Publisher): Observable<HttpResponse<any>> {
  return this.http.delete<HttpResponse<any>>(
    this.publisherUrl + '/publisher/delete/'+publisher.id,  {observe: 'response'});
}


updatePublisher(publisher: Publisher): Observable<HttpResponse<any>> {
  return this.http.put<HttpResponse<any>>(
      this.publisherUrl + '/publishers/update/'+publisher.id, publisher, {observe: 'response'});
} 
 


 getPublishersByCriteria(publisherSearchCreateria: PublisherSearchCreateria): Observable<HttpResponse<Publisher[] | any>> {
  return this.http.post<HttpResponse<PublisherSearchCreateria[] | any>>(
  this.publisherUrl+'/publisher/findbycriteria' , publisherSearchCreateria,  {observe: 'response'});
}


getPublishersByCharacter(character: string): Observable<Publisher[]> {

  return this.http.get<Publisher[]>(this.publisherUrl+'publisher'+'/findbycharacter',
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
    return Observable.of(result as T);
  };
}


}
