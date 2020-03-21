export class Author {
    id: number;
    name: string;
    booksId: number[]; 

    public static copyOf(author: Author): Author {
      return Object.assign(new Author(), author);
  }

  public clone(): Author {
      return Author.copyOf(this);
  }
  }