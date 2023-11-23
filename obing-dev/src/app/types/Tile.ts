
// Defining Tile class for bingo creation / edition

export class Tile {

    id: number;

    text: string;

    state: "empty" | "filled" | "blank";

    constructor(newId:number, newText: string="Add +") {

        this.id = newId
        this.text = newText
        this.state= "empty"

    }

    getTileText(){

        return this.text;

    }

    setTileText(newText:string){

        this.text = newText

    }

    getState(){

        return this.state;

    }

    setStateToEmpty(){

        this.state = "empty"

    }

    setStateToFilled(){

        this.state = "filled"

    }

    setStateToBlank(){
        this.state = "blank"
        this.setTileText('Blank')
    }

}