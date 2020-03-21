

export class Book {
    id: number;
    name: string;
    image: string;
    isbn: string;
    publishYear:number;
    descr:string;
    genreId: number;
    publisherId: number;
    room:string;
    pageCount:number;
    placing:string;
    type:string;
    authorsId: number[]; 



    public static copyOf(book: Book): Book {
      return Object.assign(new Book(), book);
  }

  public clone(): Book {
      return Book.copyOf(this);
  }
  }