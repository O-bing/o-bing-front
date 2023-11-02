import { guid } from "../utils/guid";

export interface Bingo{
    uid:string,
    title? : string,
    description?:string,
    owner?:string,
    creationDate?:number|Date,
    idImgIllus?:guid,
    numberPlayed:number,
    displayName?: string,
    content?:string
}