export class User {
  username: string;
  email: string;
  password: string;
  favList: string[];
  constructor(username: string, password: string, favList: string[],email: string){
    this.username = username;
    this.password = password;
    this.favList = favList;
    this.email=email;
  }
}
