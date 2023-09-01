let attract = false;

let toggleAttraction = () => {
    attract = !attract;
    button.style.border = attract ? 'none' : '3px solid purple';
}
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') toggleAttraction();
});
let button = create_button('attract \n (space)', canvas_interface, toggleAttraction);
toggleAttraction();

vector_grid = create_grid(width, height, 20);

Vmouse = new Vector(0, 0);

document.addEventListener("mousemove", (event) => {
    var rect = canvas.getBoundingClientRect();
    Vmouse = new Vector(event.clientX - rect.left, event.clientY - rect.top);
});

function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const Vposition of vector_grid) {
        let Vstart = Vposition;
        let Vector = Vmouse.sub(Vstart);

        if (attract) Vector = Vector.mult(-1);
        draw_Vstart_Vector(Vstart, Vector.normalize(10));
    }

    draw_id = window.requestAnimationFrame(draw);

} draw_id = window.requestAnimationFrame(draw);