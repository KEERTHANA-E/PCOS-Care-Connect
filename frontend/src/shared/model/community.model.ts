import { Images } from "./images.model";
export class Community {
    _id : string
    title : string
    content : string
    comments : string[]
    images : Images
    createdAt : Date
    constructor(_id : string,title : string,content : string,comments : string[],images : Images,createdAt : Date){
        this._id=_id;
        this.title=title;
        this.content=content;
        this.comments=comments;
        this.images=images;
        this.createdAt = createdAt;
    }
}
