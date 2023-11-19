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
    console.log("V1:", V1.x, V1.y);
    console.log("V2:", V2.x, V2.y);
    console.log("Vmouse:", Vmouse.x, Vmouse.y);
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
    ctx.strokeStyle = vectorColor;
    ctx.stroke();
    if (isRandomColor) vectorColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    drawColorPickers();

    v1 = new Vector(0, 0);
    v2 = new Vector(0, 0);
    ctx.closePath();
    currentColor = nextColor;
}