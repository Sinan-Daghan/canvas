document.addEventListener("click", (event) => {
    handle_click(event);
});

let mousePosition = { x: 0, y: 0 };
let rect = canvas.getBoundingClientRect();

let handle_click = (event) => {
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
    switches.forEach(item => {
        if (testAABB(mousePosition, item)) {
            item.toggle();
        }
    })
}

let testAABB = (mouse, item) => {
    if (mouse.x > item.position.xA && mouse.x < item.position.xB && mouse.y > item.position.yA && mouse.y < item.position.yB) {
        return true;
    }
    return false;
}

let drawSquare = (x, y, width, color) => {
    ctx.beginPath();
    ctx.rect(x, y, width, width);
    ctx.fillStyle = color;
    ctx.fill();
}

let switches = [];

class Switch {
    static width = 20;
    static halfWidth = Switch.width / 2;
    constructor(x, y) {
        this.state = false;
        this.out;
        this.door;
        this.position = {
            xA : x - Switch.halfWidth,
            xB : x + Switch.halfWidth,
            yA : y - Switch.halfWidth,
            yB : y + Switch.halfWidth
        }
    }
    link(object, door) {
        this.out = object;
        this.door = door;
    }
    toggle() {
        this.state = !this.state;
        if (this.door == "A" ) {
            this.out.In_A = !this.out.In_A;
        } else if (this.door == "B") {
            this.out.In_B = !this.out.In_B;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.position.xA, this.position.yA, Switch.width, Switch.width);
        if (this.state) ctx.fillStyle = 'rgb(0,255,0)';
        else ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fill();
    }
}
class AND_gate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width =20;
        this.xA = (x - this.width / 2);
        this.yA = (x + this.width / 2);

        this.In_A = false;
        this.In_B = false;
        this.Out = false;
    }
    draw() {
        if (this.In_A && this.In_B) {
            drawSquare(this.xA, this.yA, this.width, 'rgb(0, 255, 0)');
        } else {
            drawSquare(this.xA, this.yA, this.width, 'rgb(100,100,100)');
        }
    }
}
let and_gate = new AND_gate(200, 200);

let switch_1 = new Switch(150, 300);
let switch_2 = new Switch(250, 300);
switch_1.link(and_gate, "A");
switch_2.link(and_gate, "B");
switches.push(switch_1);
switches.push(switch_2);

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switches.forEach(item => {
        item.draw();
    })
    and_gate.draw();

    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);