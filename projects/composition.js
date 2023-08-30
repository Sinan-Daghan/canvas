ctx.globalCompositeOperation = "xor";
let floorRandom = (min, max) => Math.floor(random(min, max));

class Square {
    constructor() {
        this.width = floorRandom(30, 100);
        this.color = `hsl(${floorRandom(0, 360)}, 50%, 50%`;
        this.position = new Vector(canvas.width / 2 - this.width / 2, (canvas.height / 2 -  this.width / 2));
        this.speed = new Vector(random(-1, 1), random(-1, 1));
    }
    move() {
        this.position = this.position.add(this.speed);
        if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
            this.speed.x *= -1;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.speed.x *= -1;
        }
        if (this.position.y + this.width > canvas.height) {
            this.position.y = canvas.height - this.width;
            this.speed.y *= -1;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.speed.y *= -1;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.width);
    }
}

let counter = create_button('Squares : 0', canvas_interface, () => {});
let update_counter = () => {
    counter.innerText = `Squares : ${squares.length}`;
};

let squares = [];
create_button('Create 10 Squares', canvas_interface, () => {
    for (let i = 0; i < 10; i++) squares.push(new Square());
    update_counter();
});
create_button('Create 1 Square', canvas_interface, () => {
    squares.push(new Square());
    update_counter();
});
create_button('Remove 1 Square', canvas_interface, () => {
    squares.pop();
    update_counter();
});
create_button('Remove All \n Squares', canvas_interface, () => {
    squares = [];
    update_counter();
});

renderLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    squares.forEach(square => {
        square.move();
        square.draw();
    })

    setTimeout(() => {
        window.requestAnimationFrame(renderLoop);
    }, 3);
}
window.requestAnimationFrame(renderLoop);