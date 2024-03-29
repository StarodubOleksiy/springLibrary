import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import {Publisher} from '../model/publisher';
import {PublisherService} from '../publisher.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.css']
})
export class AddPublisherComponent implements OnInit {

  loadedPublisher: Publisher;
  publisher: Publisher;
  
  configureType: ConfigureType;
  bookId:number;

  publisherConfigureForm = new FormGroup({
    name: new FormControl('', [Validators.required,]),   
    city: new FormControl('', [Validators.required,])  
});
 
 
  constructor(private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private publisherServise : PublisherService,
    private route: ActivatedRoute,
    private location: Location) {
}

  
  ngOnInit() {
   
    if (this.route.snapshot.paramMap.get('configureType') === 'edit') {
      this.configureType = new ConfigureType('edit', SavePublisherConfigureType.EDIT);
      this.loadPublisher();
      
    } else {
      this.configureType = new ConfigureType('add', SavePublisherConfigureType.ADD);
      this.loadedPublisher = new Publisher();
       this.publisher = new Publisher();
       this.bookId = parseInt(this.route.snapshot.paramMap.get('configureType'));
      }  
        
  }


  loadPublisher(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('id =  '+id);
    this.publisherServise.getPublisher(id)
        .subscribe(publisher => {
            this.loadedPublisher = publisher;
            this.publisher = publisher.clone();
        });
      
}


savePublisher(): void {
  if (this.configureType.type === SavePublisherConfigureType.ADD) {
    this.publisherServise.savePublisher(this.publisher).subscribe((response: HttpResponse<any>) => {
      this.snackBar.open('Нове видавництво успішно додане.', null, {
        duration: 2000
    });
    this.router.navigate(['/savebook/add']);
  }, error => {
    this.snackBar.open('Ви ввлени неправильно дані. Перевірте і повторіть спробу'
        , null, {
            duration: 2000
        });
      }); 

} else
{
  this.publisherServise.updatePublisher(this.publisher).subscribe((response: HttpResponse<any>) => {
    this.snackBar.open('Видавництво успішно відредаговане.', null, {
      duration: 2000
  });
  this.router.navigate(['publishers']);
}, error => {
  this.snackBar.open('Ви ввлени неправильно дані. Перевірте і повторіть спробу'
      , null, {
          duration: 2000
      });
    });
}
}

goBack(): void {
  this.location.back();
}

}


export enum SavePublisherConfigureType {
  EDIT, ADD
}

class ConfigureType {
  constructor(public text: string, public type: SavePublisherConfigureType) {
  }
}
