const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
let width = canvas.width;
let height = canvas.height;
canvas.style.position = 'absolute';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
canvas.style.backgroundColor = 'rgba(100,100,100,0.5)'
canvas.style.display = 'none';
body.appendChild(canvas);

let draw_id;
function stop_draw() {
    window.cancelAnimationFrame(draw_id);
    ctx.clearRect(0, 0, width, height);
}

const ctx = canvas.getContext('2d');

//random min inclusive max exclusive;
let random = (min, max) => Math.random() * (max - min) + min;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    normalize(scalar = 1) {
        let magnitude = Math.sqrt(this.x ** 2 + this.y ** 2);
        return new Vector((this.x / magnitude) * scalar, (this.y / magnitude) * scalar);
    }
}

let random_vector = () => {
    let random_angle = Math.random() * Math.PI * 2;
    return new Vector(Math.cos(random_angle), Math.sin(random_angle));
}

function draw_Vstart_Vector(Vstart, Vector) {
    ctx.beginPath();
    ctx.moveTo(Vstart.x, Vstart.y);
    let Vend = Vstart.add(Vector);
    ctx.lineTo(Vend.x, Vend.y);
    ctx.stroke();
}

function create_grid(width, height, step) {
    let modulo_width = width % step;
    let modulo_height = height % step;
    let half_step = step / 2;

    let points_array = [];
    for (let y = (modulo_height / 2 + half_step); y < height; y += step) {
        for (let x = (modulo_width / 2 + half_step); x < width; x += step) {
            points_array.push(new Vector(x, y));
        }
    }
    return points_array;
}