export interface User{
    uid?:string,
    name?:string,
    title?:string,
    fullName?:string,
    pseudo?:string,
    description?:string,
    birthDate?:number,
    mail?:string,
    telNumber?:string,
    rank?:UserRank,
    emailVerified?: boolean,
    imgProfileRef?:string,
    listBingo?:Array<string>,
    fame?:number,
    favouriteBingo?:Array<string>,
    gameList?:Array<string>,
    isLoggedIn?:Boolean
}

export enum UserRank {
    BingoNewbie=0,
    BingoTester=1,
    BingoVeteran=2,
    BingoMaster=3,
    UserAdmin=-1
}