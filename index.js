const field = document.getElementById("field");

const rockIdList = [];
const paperIdList = [];
const scissorsIdList = [];

let RPSItems = [];

creatingRPSItems(3, 3, 3);                             // creating rocks, papers and scisors 

function rockCreater() {
    const id = rockIdList.length + 1;
    rockIdList.push(id);
    let rock = document.createElement("img");
    rock.src = "./rock.png";
    rock.id = `rock${id}`;
    rock.classList.add("rock");
    field.appendChild(rock);
    return rock
}

function paperCreater() {
    const id = paperIdList.length + 1;
    paperIdList.push(id);
    let paper = document.createElement("img");
    paper.src = "./paper.png";
    paper.id = `paper${id}`;
    paper.classList.add("paper");
    field.appendChild(paper);
    return paper
}

function scissorsCreater() {
    const id = scissorsIdList.length + 1;
    scissorsIdList.push(id);
    let scissors = document.createElement("img");
    scissors.src = "./scissors.png";
    scissors.id = `scissors${id}`;
    scissors.classList.add("scissors");
    field.appendChild(scissors);
    return scissors
}

class RockPaperScissors {
    upperBound = 0;
    bottomBound = 660;
    leftBound = 0;
    rightBound = 660;

    width = 32;
    height = 32;

    constructor(element) {
        this.element = element;
        this.x = element.offsetLeft;
        this.y = element.offsetTop;
    }

    changePosition(nextX, nextY) {
    
        if (this.x !== nextX) {
            console.log("x =", this.x)
           if ( this.leftBound < nextX  && nextX < this.rightBound) {
                this.x = nextX;
           } else {
                this.x = this.x + (nextX - this.x) * -1;
           }
        }
    
        if (this.y !== nextY) {
            console.log("y =", this.y)
            if ( this.upperBound < nextY && nextY < this.bottomBound) {
                this.y = nextY;
            } else {
                this.y = this.y + (nextY - this.y) * -1;
            }
         }
         
         return undefined;
    }
    
    changeDirection() {
        let nextMove = Math.round(Math.random() * 10);
        while ( nextMove > 7 ) {                                // choice of direction
            nextMove = Math.round(Math.random() * 10);
        }

        switch (nextMove) {
            case 0 : 
                this.changePosition(this.x, this.y - 30)
                break;            // upper
            case 1 : 
                this.changePosition(this.x + 30, this.y - 30) 
                break;            // upper-right
            case 2 : 
                this.changePosition(this.x + 30, this.y)
                break;            // right
            case 3 : 
                this.changePosition(this.x + 30, this.y + 30)
                break;       // bottom-right
            case 4 : 
                this.changePosition(this.x, this.y + 30)
                break;            // bottom
            case 5 : 
                this.changePosition(this.x - 30, this.y + 30)
                break;       // bottom-left
            case 6 : 
                this.changePosition(this.x - 30, this.y)
                break;            // left
            case 7 : 
                this.changePosition(this.x - 30, this.y - 30)
                break;       // upper-left
            default: break;
        }
    
    }
    
    moving() {
        const myInterval = setInterval(() => {
            this.changeDirection();
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }, 200)
    
        setTimeout(() => {
            clearInterval(myInterval);
        }, 10000)
    }

    change(element) {
        console.dir(this.element, element)
    }

    contact() {
        return RPSItems.filter(({x, y}) => Math.abs(this.x - x) - 32 <= 0 && Math.abs(this.y - y) - 32 <= 0)             // object interection
    }

}



function creatingRPSItems(rockCount = 0, paperCount = 0, scissorsCount = 0) {
    for (let i = 0; i < rockCount; i++) {
        RPSItems.push(new RockPaperScissors(rockCreater()))
    }
    for (let i = 0; i < paperCount; i++) {
        RPSItems.push(new RockPaperScissors(paperCreater()))
    }
    for (let i = 0; i < scissorsCount; i++) {
        RPSItems.push(new RockPaperScissors(scissorsCreater()))
    }
}

// RPSItems.forEach(e => e.moving());
