export class Images {
    url:string
    public_id : string
    _id : string
    constructor(url:string,public_id :string,_id:string){
        this._id=_id;
        this.public_id=public_id;
        this.url=url;
    }
}
