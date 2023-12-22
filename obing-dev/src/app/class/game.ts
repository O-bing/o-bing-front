export interface Game{
    uid?:string,
    title?:string,
    description?:string,
    creator?:string,
    creationDate?:number,
    usedBingoId?:string,
    playersList:string[],
    tchat:string[],
    state:GameStatus
}

export enum GameStatus {
    NoStarted=-1,
    Started=0,
    Ended=1
}