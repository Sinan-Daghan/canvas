
let angle = 0;
let angle_increment = Math.pi / 180;

generator = {
    center : new Vector(50, canvas.height / 2),
    radius : 20,
    draw : function(){
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
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

let cable_1 = new Cable(new Vector(gc.x, gc.y - gr), new Vector(gc.x + 100, gc.y - gr), -Math.PI / 2);
let cable_2 = new Cable(new Vector(gc.x, gc.y + gr), new Vector(gc.x + 100, gc.y + gr), Math.PI / 2);


main_loop = () => {
    if (angle >= 2 * Math.PI) angle = 0;

    cable_1.draw();
    cable_2.draw();

    generator.draw();

    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);
