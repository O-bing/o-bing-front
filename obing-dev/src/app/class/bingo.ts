export interface Bingo{
    uid:string,
    title? : string,
    description?:string,
    owner?:string,
    creationDate?:number|Date,
    idImgIllus?:string,
    numberPlayed:number,
    displayName?: string,
    content?:any,
    isPrivate?:boolean
}