canvas_interface.style.display = 'none';
canvas.style.display = 'none';

let emojis = []

let windowCenter = window.innerWidth / 2;
let bottomEdge = window.innerHeight;

class Emoji {
    constructor() {
        this.emoji = document.createElement("div");
        this.emoji.innerText = "🐈";
        this.emoji.style.fontSize = '100px';
        main.appendChild(this.emoji);

        this.y = random(-1000, -200);

        this.emoji.style.position = "absolute";

        this.emoji.style.left = `${random(windowCenter - 500, windowCenter + 500)}px`;
        this.emoji.style.top = `${this.y}`;

    }
    move() {
        if (this.y > bottomEdge) {
            this.y = -200;
        }
        this.y += 2;
        this.emoji.style.top = `${this.y}px`;
    }
}

for (let i = 0; i < 10; i++) {
    emojis.push(new Emoji());
}

function main_loop() {
    emojis.forEach(emoji => emoji.move());
    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);