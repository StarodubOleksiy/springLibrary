import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent }      from './authors/authors.component';
import { PublishersComponent }      from './publishers/publishers.component';
import { BooksComponent }   from './books/books.component';
import { BookDetailComponent }  from './book-detail/book-detail.component';
import { AddGenreComponent }  from './add-genre/add-genre.component';
import { AddAuthorComponent }  from './add-author/add-author.component';
import { AddPublisherComponent }  from './add-publisher/add-publisher.component';
import { SavebookComponent }  from './savebook/savebook.component';
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'index', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'booksbygenre/:id', component: BooksComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'publishers', component: PublishersComponent },
  { path: 'addgenre', children: [
  { path: '', component: SavebookComponent},
  {
        path: ':configureType',
        component: AddGenreComponent
    },
    {
        path: ':configureType/:id',
        component: AddGenreComponent
    },
    {
        path: ':id/configureType',
        component: AddGenreComponent
    }

]
},
{ path: 'addauthor', children: [
    { path: '', component: SavebookComponent},
    {
          path: ':configureType',
          component: AddAuthorComponent
      },
      {
          path: ':configureType/:id',
          component: AddAuthorComponent
      },
      {
          path: ':id/configureType',
          component: AddAuthorComponent
      }
  
  ]
  },
  { path: 'addpublisher', children: [
    { path: '', component: SavebookComponent},
    {
          path: ':configureType',
          component: AddPublisherComponent
      },
      {
          path: ':configureType/:id',
          component: AddPublisherComponent
      },
      {
          path: ':id/configureType',
          component: AddPublisherComponent
      }
  
  ]
  },

{ path: 'savebook', children: [
   {
        path: ':configureType',
        component: SavebookComponent},
       
    {
        path: ':configureType/:id',
        component: SavebookComponent
    }
]
},{ path: 'books/author/:id', component: BooksComponent },
  { path: 'books/publisher/:id', component: BooksComponent },
  { path: '**', component: NotFoundComponent }
     ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {

  
 }
