export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  favList: string[];
  role: string;
  constructor(_id:string,name: string, password: string, favList: string[],email: string, role:string){
    this.name = name;
    this.password = password;
    this.favList = favList;
    this.email=email;
    this._id = _id;
    this.role = role;
  }
}
