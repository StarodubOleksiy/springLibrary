export class Genre {
    id: number;
    name: string;

    public static copyOf(genre: Genre): Genre {
      return Object.assign(new Genre(), genre);
  }

  public clone(): Genre {
      return Genre.copyOf(this);
  }
  }