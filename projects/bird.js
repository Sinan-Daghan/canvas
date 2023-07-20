let id;
class Bird {
    static gravity = new Vector(0, 0.5);
    static Yspeed = -50;
    constructor() {
        this.x1 = canvas.width / 4;
        this.y1 = canvas.height / 2;
        this.x2 = this.x1 + 20;
        this.y2 = this.y1 + 20;
    }
    move() {
        this.y1 += Bird.gravity.y;
        this.y2 = this.y1 + 20;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x1, this.y1, 20, 20);
    }
}

let bird = new Bird();

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        bird.y1 += Bird.Yspeed;
    }
});

class Pipe {
    static width = 40;
    static speed = new Vector(-1, 0);

    constructor(x1, y1, height) {
        this.x1 = x1;
        this.y1 = y1;
        this.height = height;

        this.x2 = this.x1 + Pipe.width;
        this.y2 = this.y1 + height;
    }
    update() {
        this.x1 += Pipe.speed.x;
        this.x2 = this.x1 + Pipe.width;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x1, this.y1, Pipe.width, this.height);
    }
}

function testAABB(bird, pipe) {

    if (bird.x1 > pipe.x2 || bird.x2 < pipe.x1) {
        return;
    }
    if (bird.y2 < pipe.y1 || bird.y1 > pipe.y2) {
        return;
    }
    Bird.Yspeed = 0;
    Pipe.speed.x = 0;
}

//array with all the pipes
let Pipes = [];

function createTwoPipes(x) {
    let space = 100; //space between two pipes

    let topPipeHeight = random(125, 275);
    let TopPipe = new Pipe(x, 0, topPipeHeight);

    let bottomPipeY1 = topPipeHeight + space;
    let bottomPipeHeight = canvas.height - bottomPipeY1;

    let BottomPipe = new Pipe(x, bottomPipeY1, bottomPipeHeight);
    Pipes.push(TopPipe, BottomPipe);
}

for (let i = 0; i < 3; i++) {
    createTwoPipes(canvas.width + 50 + i * 200);
}

testPipeBoundaries = () => {

    if (Pipes[0].x1 < -100) {
        Pipes.shift();
        Pipes.shift();
        createTwoPipes(canvas.width + 100);
    }
}

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    testPipeBoundaries();
    bird.move();

    Pipes.forEach(pipe => {
        pipe.update();
        pipe.draw();
        testAABB(bird, pipe);
    })

    bird.draw();

    //test canvas boundaries
    if (bird.x1 < 0 || bird.x2 > canvas.width || bird.y1 < 0 || bird.y2 > canvas.height) {
        Bird.Yspeed = 0;
        Pipe.speed.x = 0;
        Bird.gravity.y = 0;
        window.cancelAnimationFrame(id);
    }

    id = window.requestAnimationFrame(main_loop);
};
id = window.requestAnimationFrame(main_loop);