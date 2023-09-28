let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js";

let noise_x = 0;
let noise_x_increment = 0.01;
let points = [];

script.onload = function () {
    let sketch = new p5();

    for (let i = 0; i < canvas.width; i++) {
        points.push(sketch.noise(noise_x) * canvas.height);
        noise_x += noise_x_increment;
    }

    let render_loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(index, point, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fill();
        });

        points.shift();
        points.push(sketch.noise(noise_x) * canvas.height);
        noise_x += noise_x_increment;
        window.requestAnimationFrame(render_loop);
    };

    window.requestAnimationFrame(render_loop);
};

let perlinMinStep = 0.001;
let perlinMaxStep = 0.03;
let step = create_slider('step', canvas_interface, perlinMinStep, perlinMaxStep, perlinMinStep, 0.001);
let step_value = create_button('Step : ' + perlinMinStep, canvas_interface, null);
step_value.style.backgroundColor = 'rgba(0,0,0,0)';
step_value.style.borderRadius = '0px';
step.oninput = () => {
    noise_x_increment = parseFloat(step.value);
    console.log(noise_x_increment);
    step_value.innerText = 'Step : ' + step.value;
}

document.head.appendChild(script);