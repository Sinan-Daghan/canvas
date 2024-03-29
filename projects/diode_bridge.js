let angle = 0;
let angle_increment = Math.pi / 180;

generator = {
    center : new Vector(100, canvas.height / 2 + 40),
    radius : 40,
    draw : function(){
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

class Diode {
    //distance from center to each triangle vertex
    static radius = 10;

    constructor(Vstart, Vend, color) {
        this.Vstart = Vstart;
        this.Vend = Vend;
        this.color = color;
        this.VstartVend = Vend.sub(Vstart);
        this.center = this.VstartVend.div(2).add(this.Vstart);
        //ns = normalized and scale VstartVend by Diode.radius
        this.ns = this.VstartVend.normalize(Diode.radius);
        this.vertexA = this.ns.add(this.center);
        this.vertexB = this.ns.rotate(2 * Math.PI / 3).add(this.center);
        this.vertexC = this.ns.rotate(-2 * Math.PI / 3).add(this.center);
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.vertexA.x, this.vertexA.y);
        ctx.lineTo(this.vertexB.x, this.vertexB.y);
        ctx.lineTo(this.vertexC.x, this.vertexC.y);
        ctx.lineTo(this.vertexA.x, this.vertexA.y);
        ctx.moveTo(this.Vstart.x, this.Vstart.y);
        ctx.lineTo(this.Vend.x, this.Vend.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

class Cable {
    constructor(start, end, angleOffset) {
        this.start = start;
        this.end = end;
        this.angleOffset = angleOffset;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = `hsl(${angle + this.angleOffset * 180 / Math.PI }, 60%, 60%)`;
        ctx.stroke();
    }
}
gc = generator.center;
gr = generator.radius;

class Bridge {
    constructor(left, right) {
        this.left = left;
        this.right = right;

        this.leftToMiddle = this.right.sub(this.left).div(2);

        this.bottom = new Vector(this.leftToMiddle.x, this.leftToMiddle.x).add(this.left);
        this.top = new Vector(this.leftToMiddle.x, - this.leftToMiddle.x).add(this.left);

        this.firstDiode = new Diode(this.left, this.top, 'red');
        this.secondDiode = new Diode(this.top, this.right, 'blue');
        this.thirdDiode = new Diode(this.right, this.bottom, 'green');
        this.fourthDiode = new Diode(this.bottom, this.left, 'yellow');
        
    }
    draw() {
        this.firstDiode.draw();
        this.secondDiode.draw();
        this.thirdDiode.draw();
        this.fourthDiode.draw();
    }
}
let Vmiddle = new Vector(canvas.width / 2, canvas.height / 2);
let bridge = new Bridge(Vmiddle, new Vector(Vmiddle.x + generator.radius * 2, Vmiddle.y));
bridge.draw();

let cable_1 = new Cable(new Vector(gc.x, gc.y - gr), new Vector(gc.x + 100, gc.y - gr), -Math.PI / 2);
let cable_2 = new Cable(new Vector(gc.x, gc.y + gr), new Vector(gc.x + (bridge.right.x - gc.x), gc.y + gr), Math.PI / 2);

let calbe_3 = new Cable(bridge.top, new Vector(bridge.top.x + 200, bridge.top.y), 0);
calbe_3.draw();
let calbe_4 = new Cable(bridge.bottom, new Vector(bridge.bottom.x + 200, bridge.bottom.y), 0);
calbe_4.draw();

let cable_5 = new Cable(new Vector(gc.x + (bridge.right.x - gc.x), gc.y + gr), new Vector(gc.x + (bridge.right.x - gc.x), bridge.right.y), Math.PI / 2);
cable_5.draw();

main_loop = () => {
    if (angle >= 2 * Math.PI) angle = 0;

    cable_1.draw();
    cable_2.draw();

    generator.draw();

    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);
