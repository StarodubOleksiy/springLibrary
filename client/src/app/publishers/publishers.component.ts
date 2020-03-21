import { Component, OnInit, ViewChild } from '@angular/core';
import {Publisher } from '../model/publisher';
import { PublisherService } from '../publisher.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import {PublisherSearchCreateria } from '../PublisherSearchCriteria';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  public selectedId:number;

  publishers: Publisher[] = [] ; 
  returnedPublishers: Publisher[]  = [];
  searchType: string;
  publisherSearchCreateria: PublisherSearchCreateria;
  searchForm = new FormGroup({
    search: new FormControl('', [
        Validators.required,
    ]),
    type: new FormControl(false),
    createria: new FormControl('', [Validators.required,])
}); 

  findByCity = new FormControl();

checkingSearch(): void {
  console.log("Fumction on change findByCity = "+this.findByCity.value);
  this.publisherSearchCreateria.findByCity = this.findByCity.value;
  console.log("this.publisherSearchCreateria.findByCity = "+this.publisherSearchCreateria.findByCity);
  if( this.findByCity.value === false)
     this.searchType ="Знайти за допомогою назви видавництва";  
   else
   this.searchType ="Знайти за допомогою міста"; 
  } 
  
  constructor(private publisherService: PublisherService,
              private router: Router,public snackBar: MatSnackBar) { 
                this.searchType ="Знайти за допомогою міста";  
              }

  ngOnInit() {
    console.log('selectedId ='+this.selectedId);
    this.publisherSearchCreateria = new PublisherSearchCreateria();
    this.publisherSearchCreateria.findByCity = true;
    this.getPublishers();
     this.searchType ="Знайти за допомогою назви видавництва";

  }

  refresh(): void {
    console.log('selectedId ='+this.selectedId);
    this.getPublishers();
  }

  editPublisher(id: number) : void {
    this.router.navigateByUrl('/addpublisher/edit/' + id);
  }
 
  

  onSelect(publisher) {
      const id = publisher.id;
      this.router.navigate(['books/publisher/' + id]);
    console.log('on select works!!!');
  }


  getPublishers(): void {
    this.publisherService.getPublishers()
       .subscribe(publishers => 
        {
        this.publishers = publishers;
        this.returnedPublishers = this.publishers.slice(0, 10);
        });
       console.log("publishers.size() = "+this.publishers.length);       
  }


  onPublisherDeleteClick(publisher: Publisher): void {
    var deleteConfirmation = confirm('Ви впевнені що хочете видалити це видавництво?');
    if (deleteConfirmation)
    this.publisherService.deletePublisher(publisher)
                .subscribe(response => this.onDeletePublisherResponse(publisher, response)
                , error => {
                  this.snackBar.open('Publisher cannot be deleted. It is not empty and has books.'
                      , null, {
                          duration: 2000
                      });
              });
                this.router.navigate(['publishers']);
         }
  

         
  private onDeletePublisherResponse(publisher: Publisher, response: HttpResponse<any>): void {
    if (response.status === HttpStatus.OK) {
        this.snackBar.open('Publisher deleted sucsessfully.', null, {
            duration: 2000
        });
        let index = this.publishers.indexOf(publisher);
        this.publishers.splice(index, 1);
    }  
  }

  private searchPublisher(): void {
    this.publisherService.getPublishersByCriteria(this.publisherSearchCreateria)
    .subscribe(publishers => 
      { 
        this.publishers = publishers.body;
        this.returnedPublishers = this.publishers.slice(0, 10);
        });
  }

  findByCharacter(character:string):void 
  {
    this.publisherService.getPublishersByCharacter(character)
    .subscribe(publishers => 
      { 
        this.publishers = publishers;
        this.returnedPublishers = this.publishers.slice(0, 10);           
       });
   }

   pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
     this.returnedPublishers = this.publishers.slice(startItem, endItem);
  }
  

}
