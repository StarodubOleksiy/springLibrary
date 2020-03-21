import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import { Author } from '../model/author';
import { Location } from '@angular/common';
import { AuthorService } from '../author.service';


@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  loadedAuthor: Author;
  author: Author;
  
  configureType: ConfigureType;
  bookId:number;

  authorConfigureForm = new FormGroup({
    name: new FormControl('', [
        Validators.required,
    ]),
   
});
 
 
  constructor(private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private authorServise : AuthorService,
    private route: ActivatedRoute,
    private location: Location) {
}

  
  ngOnInit() {
   
    if (this.route.snapshot.paramMap.get('configureType') === 'edit') {
      this.configureType = new ConfigureType('edit', SaveAuthorConfigureType.EDIT);
      this.loadAuthor();
      
    } else {
      this.configureType = new ConfigureType('add', SaveAuthorConfigureType.ADD);
      this.loadedAuthor = new Author();
       this.author = new Author();
       this.bookId = parseInt(this.route.snapshot.paramMap.get('configureType'));
      }  
        
  }


  loadAuthor(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('id =  '+id);
    this.authorServise.getAuthor(id)
        .subscribe(author => {
            this.loadedAuthor = author;
            this.author = author.clone();
        });      
}


  saveAuthor(): void {
      if (this.configureType.type === SaveAuthorConfigureType.EDIT)
    this.author.id = this.loadedAuthor.id;
    this.authorServise.saveAuthor(this.author).subscribe((response: HttpResponse<any>) => {
      if (this.configureType.type === SaveAuthorConfigureType.ADD) {
        this.snackBar.open('Новий aвтор успішно доданий.', null, {
            duration: 2000
        });
      if(isNaN(this.bookId))
      this.router.navigate(['/savebook/add']);
       else
       this.router.navigate(['/savebook/edit/'+this.bookId]);
    } else {
        this.snackBar.open('Автор успішно відредагований.', null, {
            duration: 2000
        });
        this.router.navigate(['authors']);
    }
     
    }, error => {
        this.snackBar.open('Author  with the such name is already exists in database .'
            , null, {
                duration: 2000
            });
    });
};


goBack(): void {
  this.location.back();
}



}


export enum SaveAuthorConfigureType {
  EDIT, ADD
}



class ConfigureType {
  constructor(public text: string, public type: SaveAuthorConfigureType) {
  }
}
