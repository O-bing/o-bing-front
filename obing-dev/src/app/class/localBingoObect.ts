import { Tile } from "../types/Tile";
import { Bingo } from "./bingo";

export interface LocalBingoObject {
    bingoId: string,
    bingoData: Bingo,
    bingoBody: Array<Array<Tile>>
  }