import { Injectable } from '@angular/core';
import { Publisher } from './model/publisher';
import {Observable} from 'rxjs/Observable';
import { HttpClient,  HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import { PublisherSearchCreateria } from './PublisherSearchCriteria';
import  "rxjs/add/operator/map" ;
import 'rxjs/add/operator/catch';

@Injectable()
export class PublisherService {

  
  private publisherUrl = environment.apiUrl;   // URL to web api
  //private booksUrl = '/books';
  //private booksUrl = environment.apiUrl; 
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
   return this.http.post<HttpResponse<any>>(
     this.publisherUrl + '/publisher/delete', publisher, {observe: 'response'});
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

}
