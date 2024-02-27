export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  favList: string[];
  role: string;
  constructor(_id:string,username: string, password: string, favList: string[],email: string, role:string){
    this.username = username;
    this.password = password;
    this.favList = favList;
    this.email=email;
    this._id = _id;
    this.role = role;
  }
}
