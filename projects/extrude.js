let Vpos = new Vector(10, 100);
let Vvel = new Vector(1, 0.5);

ctx.fillStyle = 'black';
ctx.font = "48px serif";

let h = 207;

main_loop = () => {
    ctx.strokeStyle = `hsl(${h}, 54%, 43%)`;
    ctx.fillText("Hello world", Vpos.x, Vpos.y);
    ctx.strokeText("Hello world", Vpos.x, Vpos.y);
    if (rainbow) h++;
    Vpos = Vpos.add(Vvel);

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 100);
}
window.requestAnimationFrame(main_loop);

create_button('reset', canvas_interface, () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Vpos = new Vector(10, 100);
    Vvel = new Vector(1, 0.5);
});

let rainbow = false;
let btn_rainbow = create_button('rainbow', canvas_interface, () => {
    rainbow = !rainbow;
    rainbow ? btn_rainbow.style.border = "2px solid red" : btn_rainbow.style.border = "none";
});