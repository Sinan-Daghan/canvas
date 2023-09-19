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

//  return random number min inclusive max exclusive
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

    mult(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    get_magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(scalar = 1) {
        let magnitude = Math.sqrt(this.x ** 2 + this.y ** 2);
        return new Vector((this.x / magnitude) * scalar, (this.y / magnitude) * scalar);
    }

    rotate(angle) {
        let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Vector(x, y);
    }

    static add(vector1, vector2) {
        vector1.x += vector2.x;
        vector1.y += vector2.y;
    }
}

let random_vector = () => {
    let random_angle = Math.random() * Math.PI * 2;
    return new Vector(Math.cos(random_angle), Math.sin(random_angle));
}
let scale = (value, min, max, new_min, new_max) => {
    return (value - min) * (new_max - new_min) / (max - min) + new_min;
}

let clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
}

let draw_Vector = (Vector) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Vector.x, Vector.y);
    ctx.stroke();
}

let draw_Vstart_Vend = (Vstart, Vend, arrow=false, color='black') => {
    ctx.beginPath();
    ctx.moveTo(Vstart.x, Vstart.y);
    ctx.lineTo(Vend.x, Vend.y);
    ctx.strokeStyle = color;
    ctx.stroke();

    if (arrow) {
        ctx.beginPath();
        let vector = Vend.sub(Vstart);

        ctx.moveTo(Vend.x, Vend.y);

        let vertexA = vector.rotate(5 * Math.PI / 6).normalize(10);
        ctx.lineTo(Vend.x + vertexA.x, Vend.y + vertexA.y);

        let vertexB = vector.rotate(-5 * Math.PI / 6).normalize(10);
        ctx.lineTo(Vend.x + vertexB.x, Vend.y + vertexB.y);

        ctx.lineTo(Vend.x, Vend.y);

        ctx.fillStyle = color;
        ctx.fill();
    }
}

// A = vector A , B = vector B
let dot_product = (A, B) => {
    return A.x * B.x + A.y * B.y;
}

// angle between two vectors = Arcos (dot_product / (magnitude1 * magnitude2))
let angle_between = (A, B) => {
    let dot = dot_product(A, B);
    let magnitude_A = A.get_magnitude();
    let magnitude_B = B.get_magnitude();
    return Math.acos(dot / (magnitude_A * magnitude_B));
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

let circle = (x, y, r, color = "red") => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

// 2D Ball
class Ball {
    constructor(x, y, radius, velocity = new Vector(0, 0), acceleration = new Vector(0, 0)) {
        this.position = new Vector(x, y);
        this.radius = radius;
        this.velocity = velocity;
        this.acceleration = acceleration;
        // this.mass = area of circle
        this.mass = Math.PI * radius * radius;

        // -- Friction_variables -- start
        this.friction = new Vector(0, 0);
        this.mu = 0.01;
        this.normal = this.mass;
        // -- Friction_variables -- end

        // -- Drag_variables -- start
        this.speed = this.velocity.get_magnitude();
        this.drag = new Vector(0, 0);
        // -- Drag_variables-- end
    }

    draw = (rgba = 'rgba(0,0,0,0.1)') => {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba;
        ctx.fill();
    }

    apply_force = (force) => {
        this.velocity = this.velocity.add(force);
    }

    apply_friction = () => {
        this.friction = this.velocity.normalize(-1);
        this.friction.mult(this.mu * this.normal);
        this.velocity = this.velocity.add(this.friction);
    }

    apply_drag(drag_coefficient = 0.01) {
        this.speed = this.velocity.get_magnitude();
        this.drag = this.velocity.normalize(-1 * (drag_coefficient * this.speed ** 2));
        this.velocity = this.velocity.add(this.drag);
    }

    // If ( outside the borders ) {position = edge - radius} // prevents tunneling
    update() {
        if (this.position.x > width - this.radius) {
            this.position.x = width - this.radius;
            this.velocity.x *= -1;
            this.apply_friction();
        }
        if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
            this.apply_friction();

        }
        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
            this.apply_friction();

        }
        if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
            this.apply_friction();
        }

        this.position = this.position.add(this.velocity);
    }
}

let UP = new Vector(0, -1);
let DOWN = new Vector(0, 1);
let LEFT = new Vector(-1, 0);
let RIGHT = new Vector(1, 0);

let event_handler = (event) => {
    switch (event.key) {
        case "ArrowUp":
            direction = UP;
            break;
        case "ArrowDown":
            direction = DOWN;
            break;
        case "ArrowLeft":
            direction = LEFT;
            break;
        case "ArrowRight":
            direction = RIGHT;
            break;
    }
}
let add_arrow_keys_event_listener = () => {
    document.addEventListener("keydown", event_handler);
}
let remove_arrow_keys_event_listener = () => {
    document.removeEventListener("keydown", event_handler);
}

class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // matrix[column][row]
    transformation(matrix) {
        let x = matrix[0][0] * this.x + matrix[1][0] * this.y + matrix[2][0] * this.z;
        let y = matrix[0][1] * this.x + matrix[1][1] * this.y + matrix[2][1] * this.z;
        let z = matrix[0][2] * this.x + matrix[1][2] * this.y + matrix[2][2] * this.z;
        return new Vec3(x, y, z);
    }
}

// Rotation matrices
R_x = (angle) => {
    return [[1, 0, 0], [0, Math.cos(angle), Math.sin(angle)], [0, -Math.sin(angle), Math.cos(angle)]];
}
R_y = (angle) => {
    return [[Math.cos(angle), 0, -Math.sin(angle)], [0, 1, 0], [Math.sin(angle), 0, Math.cos(angle)]];
}
R_z = (angle) => {
    return [[Math.cos(angle), Math.sin(angle), 0], [-Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]];
}