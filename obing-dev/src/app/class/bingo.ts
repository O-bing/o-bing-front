import { guid } from "../utils/guid";

export interface Bingo{
    uid:string,
    title? : string,
    description?:string,
    owner?:string,
    creationDate?:number,
    idImgIllus?:guid,
    numberPlayed:number,
    displayName?: string
}