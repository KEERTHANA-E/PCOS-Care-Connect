import { Images } from "./images.model"

export class Library {
    _id : string
    title : string
    content : string
    comments : string[]
    images : Images[]
    videos : Images[]
    createdAt : Date
    constructor(_id : string,title : string,content : string,comments : string[],images : Images[],videos : Images[],createdAt : Date){
        this._id=_id;
        this.title=title;
        this.content=content;
        this.comments=comments;
        this.images=images;
        this.videos=videos;
        this.createdAt = createdAt;
    }
}
