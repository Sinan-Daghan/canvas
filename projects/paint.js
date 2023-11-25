let clickCount = 0;

let boxCanvas = canvas.getBoundingClientRect();
let canvasCorner = new Vector(boxCanvas.x, boxCanvas.y);

let v1 = new Vector(0, 0);
let v2 = new Vector(0, 0);
let Vmouse = new Vector(0, 0);
let vectorColor = "black";
class colorPicker {
    static width = 30;
    constructor(x,y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = colorPicker.width;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, colorPicker.width, colorPicker.width);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}
class Line {
    constructor(v1, v2, color) {
        this.v1 = v1;
        this.v2 = v2;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.v1.x, this.v1.y);
        ctx.lineTo(this.v2.x, this.v2.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}

isRandomColor = false;

let colorPickers = []
let blue = new colorPicker(10, 10, "blue");
colorPickers.push(blue);

let drawColorPickers = () => {
    colorPickers.forEach(e => {
        e.draw();
    });
}
drawColorPickers();
let AABB = (V1, V2, Vmouse) => {
    if (Vmouse.x > V1.x && Vmouse.x < V2.x && Vmouse.y > V1.y && Vmouse.y < V2.y) {
        return true;
    }
    return false;
};

AABBpickerMouse = (picker, Vmouse) => {
    if (AABB(new Vector(picker.x, picker.y), new Vector(picker.x + picker.width, picker.y + picker.width), Vmouse)) {
        vectorColor = picker.color;
        nextColor = picker.color;
        console.log("collision");
    } else {
        console.log("NO collision");
    }
}

testCollisionWithAllColorPickers = (Vmouse) => {
    colorPickers.forEach(picker => {
        AABBpickerMouse(picker, Vmouse);
    });
}
currentColor = "black";
nextColor = "black";
let drawed = [];

onmousedown = (e) => {
    clickCount++;
    vectorColor = currentColor;
    Vmouse = new Vector(e.clientX, e.clientY);
    testCollisionWithAllColorPickers(Vmouse.sub(canvasCorner));
    if (clickCount == 1) {
        v1 = Vmouse;
        return;
    }
    v2 = Vmouse;

    clickCount = 0;
    v1 = v1.sub(canvasCorner);
    v2 = v2.sub(canvasCorner);
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    drawed.push(new Line(v1, v2, vectorColor));
    ctx.strokeStyle = vectorColor;
    ctx.stroke();
    if (isRandomColor) vectorColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    drawColorPickers();

    v1 = new Vector(0, 0);
    v2 = new Vector(0, 0);
    ctx.closePath();
    currentColor = nextColor;
}

let cursorWidth = 12;
let cursorHeight = 2;
let halfCursorWidth = cursorWidth / 2;
let halfCursorHeight = cursorHeight / 2;

let changeCursorSize = (width, height) => {
    cursorWidth = width;
    cursorHeight = height;
    halfCursorWidth = cursorWidth / 2;
    halfCursorHeight = cursorHeight / 2;
}

let drawCursor = (eMouse) => {
    Vmouse = new Vector(eMouse.clientX, eMouse.clientY).sub(canvasCorner);
    ctx.beginPath();
    ctx.rect(Vmouse.x - halfCursorWidth, Vmouse.y - halfCursorHeight, cursorWidth, cursorHeight);
    ctx.rect(Vmouse.x - halfCursorHeight, Vmouse.y - halfCursorWidth, cursorHeight, cursorWidth);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

onmousemove = (eMouse) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawColorPickers();
    drawed.forEach(line => {
        line.draw();
    });
    drawCursor(eMouse);
}