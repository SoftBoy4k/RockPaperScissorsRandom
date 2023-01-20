const field = document.getElementById("field");

const rockIdList = [];
const paperIdList = [];
const scissorsIdList = [];

let RPSItems = [];

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

    getWinner(el) {
        const elClass1 = el.element.classList[0]; 
        const elClass2 = this.element.classList[0]; 
        if (elClass1 === elClass2) {
            return;
        } else if ((elClass1 === "rock" && elClass2 === "paper")) {
            this.removeElement(el.element);                                                          // choosing which element to change
            RPSItems.push(new RockPaperScissors(paperCreater()));
            return RPSItems[RPSItems.length - 1].moving();
        } else if ((elClass1 === "rock" && elClass2 === "scissors")) {
            this.removeElement(el.element);                                                          // choosing which element to change
            RPSItems.push(new RockPaperScissors(rockCreater()));
            return RPSItems[RPSItems.length - 1].moving();
        } else if ((elClass1 === "paper" && elClass2 === "scissors")) {
            this.removeElement(el.element);                                                          // choosing which element to change
            RPSItems.push(new RockPaperScissors(scissorsCreater()));
            return RPSItems[RPSItems.length - 1].moving();
        }
    }
    
    removeElement(el) {
        let elIndex = 0;
        RPSItems.forEach((elem, i) => elem.element === el ? elIndex = i : undefined);
        RPSItems.splice(elIndex, 1);
        el.remove();
    }
    
    moving() {
        const myInterval = setInterval(() => {
            const contacts = this.contacts()
            if (contacts.length) {
                contacts.forEach(el => this.getWinner(el))
            }
            this.changeDirection();
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }, 1000)
    
        setTimeout(() => {
            clearInterval(myInterval);
        }, 10000)
    }

    contacts() {
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

creatingRPSItems(3, 3, 3);                             // creating rocks, papers and scisors 

RPSItems.forEach(e => e.moving());
