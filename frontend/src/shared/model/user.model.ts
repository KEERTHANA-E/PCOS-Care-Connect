export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  favList: string[];
  role: string;
  phoneNumber: string;
  street:string;
  city: string;
  zipCode: string;
  state: string;
  age: number;
  weight: number;
  height: number;
  about: string;
  constructor(_id:string,name: string, password: string, favList: string[],email: string, role:string, phoneNumber: string, street: string, city: string, zipCode : string, state: string, age: number, weight: number, height: number, about: string){
    this.name = name;
    this.password = password;
    this.favList = favList;
    this.email=email;
    this._id = _id;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.state = state;
    this.age=age;
    this.weight=weight;
    this.height=height;
    this.about=about;
  }
}
