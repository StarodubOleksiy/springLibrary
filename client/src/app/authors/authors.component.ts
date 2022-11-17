import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../model/author';
import { AuthorService } from '../author.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import { SearchCreateria } from '../SearchCreateria';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-authorss',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  public selectedId:number;

  authors: Author[]  = []; 
  returnedAuthors: Author[]  = [];
  nameOfAuthor: string;

  searchcreateria: SearchCreateria;
  searchForm = new FormGroup({
    search: new FormControl('', [
        Validators.required,
    ]),
    type: new FormControl(false),
    createria: new FormControl('', [Validators.required,])
}); 

   
  
  constructor(private authorService: AuthorService,
              private router: Router, public snackBar: MatSnackBar) {
               }

  ngOnInit() {
    console.log('selectedId ='+this.selectedId);
    this.searchcreateria = new SearchCreateria();
    this.getAuthors();
  }

  refresh(): void {
    console.log('selectedId ='+this.selectedId);
    this.getAuthors();
  }
 
  

  onSelect(author) {
      const id = author.id;
      this.router.navigate(['books/author/' + id]);
    console.log('on select works!!!');
  }



  getAuthors(): void {
    this.authorService.getAuthors()
       .subscribe(authors => {this.authors = authors;
        this.returnedAuthors = this.authors.slice(0, 10);
      });
       
       console.log("authors.size() = "+this.authors.length);
       
  }


  editAuthor(id: number) : void {
    this.router.navigateByUrl('/addauthor/edit/' + id);
  }


  onAuthorDeleteClick(author: Author): void {
    var deleteConfirmation = confirm('Ви впевнені що хочете видалити цього автора?');
    if (deleteConfirmation)  
    this.authorService.deleteAuthor(author)
                .subscribe(response => this.onDeleteAuthorResponse(author, response)
                , error => {
                  this.snackBar.open('Author cannot be deleted. He is not empty and has books'
                      , null, {
                          duration: 2000
                      });
              });
         }



         
  private onDeleteAuthorResponse(author: Author, response: HttpResponse<any>): void {
    console.log('response.status ==='+response.status);
    console.log('HttpStatus.NO_CONTENT ==='+HttpStatus.NO_CONTENT);
    if (response.status === HttpStatus.NO_CONTENT) {
        this.snackBar.open('Author deleted sucsessfully.', null, {
            duration: 2000
        });
        let index = this.authors.indexOf(author);
        this.authors.splice(index, 1);
    }  else {
      this.snackBar.open('Author cannot be deleted.'
          , null, {
              duration: 2000
          });
  }

  }


  

  private findAuthorsByName():void 
{
  this.authorService.getAuthorsByName(this.nameOfAuthor)
  .subscribe(authors => 
    { 
      this.authors = authors;    
      this.returnedAuthors = this.authors.slice(0, 10);
    });
 }



 findByCharacter(character:string):void 
{
  this.authorService.getAuthorsByCharacter(character)
  .subscribe(authors => 
    { 
      this.authors = authors; 
      this.returnedAuthors = this.authors.slice(0, 10);          
     });
 }

 pageChanged(event: PageChangedEvent): void {
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
   this.returnedAuthors = this.authors.slice(startItem, endItem);
}
  

}