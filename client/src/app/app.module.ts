import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookService } from './book.service';
import { GenreService } from './genre.service';
import { AuthorService } from './author.service';
import { PublisherService } from './publisher.service';
import { AppRoutingModule } from './/app-routing.module';
import { BooksComponent } from './books/books.component';
import { NgbdModalConfirm } from './books/books.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {
   MatCardModule,
   MatIconModule,
  MatSelectModule,
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SavebookComponent } from './savebook/savebook.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { PaginationModule } from 'ngx-bootstrap';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';
import { PublishersComponent } from './publishers/publishers.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgbModule,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';





@NgModule({
 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    NoopAnimationsModule,
    MatCardModule,
    MatInputModule,    
    MatSnackBarModule,  
    MatGridListModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSlideToggleModule,
    PaginationModule.forRoot(),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AuthorsComponent,
    BookDetailComponent,
    BooksComponent,
    AddGenreComponent,
    SavebookComponent,
    AddAuthorComponent,
    AddPublisherComponent,
    PublishersComponent,
    NgbdModalConfirm
     
  ],
   entryComponents: [NgbdModalConfirm],
   providers: [BookService, GenreService,AuthorService,PublisherService], 
   bootstrap: [AppComponent]
})
export class AppModule { }
