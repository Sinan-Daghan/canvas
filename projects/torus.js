let torusVertices = [];
class Torus {
    static majorRadius = 140;
    static minorRadius = 50;

    constructor(majorVertices, minorVertices) {
        this.majorVertices = majorVertices;
        this.minorVertices = minorVertices;
        for (let i = 0 ; i <= 2 * Math.PI ; i += 2 * Math.PI / this.majorVertices) {
            for (let j = 0 ; j <= 2 * Math.PI ; j += 2 * Math.PI / this.minorVertices) {
                let x = (Torus.majorRadius + Torus.minorRadius * Math.cos(j)) * Math.cos(i);
                let y = (Torus.majorRadius + Torus.minorRadius * Math.cos(j)) * Math.sin(i);
                let z = Torus.minorRadius * Math.sin(j);
                torusVertices.push(new Vec3(x, y, z));
            }
        }
    }
}
let projection_matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 0]];

let torus = new Torus(20, 10);
torusVertices.forEach((vertex) => {
    vertex = vertex.transformation(projection_matrix);
});

ctx.translate(canvas.width / 2, canvas.height / 2);

let main_loop = () => {
    let next_vertices = [];
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    torusVertices.forEach((vertex) => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle= 'red';
        ctx.stroke();
        let next_vetex = vertex.transformation(R_x(Math.PI / 360));
        next_vetex = next_vetex.transformation(R_y(Math.PI / 360));
        next_vertices.push(next_vetex);
    });
    torusVertices = next_vertices;


    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 20);
}

window.requestAnimationFrame(main_loop);