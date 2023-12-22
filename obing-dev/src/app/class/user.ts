export interface User{
    uid:string,
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
    listBingo?:string[],
    fame?:number,
    favouriteBingo?:string[],
    gameList?:string[],
    isLoggedIn?:boolean,
    friendsList?:string[]
}

export enum UserRank {
    BingoNewbie=0,
    BingoTester=1,
    BingoVeteran=2,
    BingoMaster=3,
    UserAdmin=-1
}