import { guid } from "../utils/guid";

export interface User{
    uid?:string,
    name?:string,
    title?:string,
    firstName?:string,
    pseudo?:string,
    description?:string,
    birthDate?:number,
    mail?:string,
    telNumber?:string,
    rank?:UserRank,
    emailVerified?: boolean,
    idImgProfil?:guid,
    listBingo?:Array<string>,
    fame?:number,
    favouriteBingo?:Array<string>,
    gameList?:Array<string>
}

export enum UserRank {
    UserLambda=0,
    UserAdmin=1
}