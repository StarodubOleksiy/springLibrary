import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import { Genre } from '../model/genre';
import { GenreService } from '../genre.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {

  loadedGenre: Genre;
  genre: Genre;
  
  configureType: ConfigureType;
  bookId:number;

  genreConfigureForm = new FormGroup({
    name: new FormControl('', [
        Validators.required,
    ]),
   
});
 
 


  constructor(private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private genreServise : GenreService,
    private route: ActivatedRoute,
    private location: Location) {
}

  
  ngOnInit() {
   
    if (this.route.snapshot.paramMap.get('configureType') === 'edit') {
      this.configureType = new ConfigureType('edit', SaveGenreConfigureType.EDIT);
      this.loadGenre();
      
    } else {
      this.configureType = new ConfigureType('add', SaveGenreConfigureType.ADD);
      this.loadedGenre = new Genre();
       this.genre = new Genre();
       this.bookId = parseInt(this.route.snapshot.paramMap.get('configureType'));
         }  
        
  }


  loadGenre(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('id =  '+id);
    this.genreServise.getGenre(id)
        .subscribe(genre => {
            this.loadedGenre = genre;
            this.genre = genre.clone();
        });
      
}


  saveGenre(): void {
      if (this.configureType.type === SaveGenreConfigureType.EDIT)
    this.genre.id = this.loadedGenre.id;
    this.genreServise.saveGenre(this.genre).subscribe((response: HttpResponse<any>) => {
      if (this.configureType.type === SaveGenreConfigureType.ADD) {
        this.snackBar.open('Новий жанр успішно доданий.', null, {
            duration: 2000
        });
      if(isNaN(this.bookId))
      this.router.navigate(['/savebook/add']);
       else
       this.router.navigate(['/savebook/edit/'+this.bookId]);
    } else {
        this.snackBar.open('Жанр успішно відредагований.', null, {
            duration: 2000
        });
        this.router.navigate(['books']);
    }
     
    }, error => {
        this.snackBar.open('Genre  with the such name is already exists in database .'
            , null, {
                duration: 2000
            });
    });
};


goBack(): void {
  this.location.back();
}



}


export enum SaveGenreConfigureType {
  EDIT, ADD
}

class ConfigureType {
  constructor(public text: string, public type: SaveGenreConfigureType) {
  }
}

