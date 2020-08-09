import { Genre } from '../model/genre';

export class Hero {
  readonly id: number;
  readonly name: string;
  readonly surName: string; 
  readonly someArr: string[];

  public toString = () : string => {
    return `Bar(${this.id}) ,name = (${this.name}),
    surName = (${this.surName}),
    (${this.someArr.forEach(element => {
      console.log("ArrayElement = "+element);
    })})`;
}

}

export interface SecondHero {
  name: string;
  surName: string;   
}

export class ThirdHero {
  readonly name="namestring";
  readonly surName="surnamestring";  
  public toString = () : string => {
    return `ThirdHero (${this.surName}) ,
    name = (${this.name})`;
} 
}




export class AngularDeveloper {
    id=25;
    readonly name="SomeName";
    hero: Hero;
    
    
    myMethod() {
      console.log(this.name);
     
    //  this.name = "5"; // error, readonly
  }
 


    HEROES: string[] = ["Dr Nice","Narco",
    "Bombasto","Celeritas",
    "RubberMan","Dynama"];

     HEROESISting: Hero[] = [
      { id: 11, name: 'Dr Nice', surName: 'A1' ,someArr: ["AB","bA"]},
      { id: 12, name: 'Narco' , surName: 'B2',someArr: ["CD","DC"]},
      { id: 13, name: 'Bombasto' , surName: 'C3',someArr: ["EF","fe"]},
      { id: 14, name: 'Celeritas', surName: 'D4' ,someArr: ["GH","hg"]},
      { id: 15, name: 'Magneta' , surName: 'E5',someArr: ["HI","IH"]},
      { id: 16, name: 'RubberMan' , surName: 'F6',someArr: ["JK","KJ"]},
      { id: 17, name: 'Dynama' , surName: 'G7',someArr: ["LM","ML"]},
      { id: 18, name: 'Dr IQ' , surName: 'H8',someArr: ["NO","ON"]},
      { id: 19, name: 'Magma' , surName: 'I9',someArr: ["PQ","QP"]},
      { id: 20, name: 'Tornado' , surName: 'J10',someArr: ["RS","SR"]}
    ];

    public static copyOf(angularDeveloper: AngularDeveloper): AngularDeveloper {
      return Object.assign(new AngularDeveloper(), angularDeveloper);
  }

  public clone():AngularDeveloper {
      return AngularDeveloper.copyOf(this);
  }

  public toString = () : string => {
    return `Bar(${this.id}) ,name = (${this.name}),
    (${this.HEROES.forEach(element => {
      console.log("element = "+element);
    })})`;
}
  }

  export const HEROESinstring: string[] = ["Dr Nice","Narco",
    "Bombasto","Celeritas",
    "RubberMan","Dynama"];
  
  export const HEROESIS: Hero[] = [
    { id: 11, name: 'Dr Nice', surName: 'A1' ,someArr: ["AB","bA"]},
    { id: 12, name: 'Narco' , surName: 'B2',someArr: ["CD","DC"]},
    { id: 13, name: 'Bombasto' , surName: 'C3',someArr: ["EF","fe"]},
    { id: 14, name: 'Celeritas', surName: 'D4' ,someArr: ["GH","hg"]},
    { id: 15, name: 'Magneta' , surName: 'E5',someArr: ["HI","IH"]},
    { id: 16, name: 'RubberMan' , surName: 'F6',someArr: ["JK","KJ"]},
    { id: 17, name: 'Dynama' , surName: 'G7',someArr: ["LM","ML"]},
    { id: 18, name: 'Dr IQ' , surName: 'H8',someArr: ["NO","ON"]},
    { id: 19, name: 'Magma' , surName: 'I9',someArr: ["PQ","QP"]},
    { id: 20, name: 'Tornado' , surName: 'J10',someArr: ["RS","SR"]}
  ];