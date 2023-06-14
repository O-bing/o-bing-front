export interface Game{
    uid?:string,
    title?:string,
    description?:string,
    creator?:string,
    creationDate?:number,
    usedBingoId?:string,
    playersList:Array<string>,
    tchat:Array<string>,
    state:GameStatus
}

export enum GameStatus {
    NoStarted=-1,
    Started=0,
    Ended=1
}