export class Publisher {
  id: number;
  name: string;
  city: string;

  public static copyOf(publisher: Publisher): Publisher {
    return Object.assign(new Publisher(), publisher);
}

public clone(): Publisher {
    return Publisher.copyOf(this);
}
}
