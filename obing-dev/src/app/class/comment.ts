export interface Comment{
    uid?:string,
    idCreator?:string,
    pseudoCreator?:string,
    dateCreat?:number,
    title:string,
    content:string,
    idDocPj?:string[],
    idImgPj?:string[]
}