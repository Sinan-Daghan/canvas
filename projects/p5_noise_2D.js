let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js";

let increment = 0.01;
let zCut = 100;
let HighPass = true;

script.onload = function () {
    let sketch = new p5();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let ystart = 0;
    let yoff = 0;
    let xoff = 0;
    let render_loop = () => {
        yoff = ystart;
        for (let y = 0; y < canvas.height; y++) {
            xoff = 0;
            yoff += increment;
            for (let x = 0; x < canvas.width; x++) {
                let index = y * canvas.width * 4 + x * 4;
                let perlinPixel = sketch.noise(xoff, yoff) * 255;
                data[index]     = perlinPixel;
                data[index + 1] = perlinPixel;
                data[index + 2] = perlinPixel;
                data[index + 3] = 255;

                if (HighPass && perlinPixel < zCut){
                    data[index]     = 255;
                    data[index + 1] = 255;
                    data[index + 2] = 255;
                    data[index + 3] = 255;
                }
                if (!HighPass && perlinPixel > zCut){
                    data[index]     = 255;
                    data[index + 1] = 255;
                    data[index + 2] = 255;
                    data[index + 3] = 255;
                }
                xoff += increment;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        ystart += increment;

        setTimeout(() => {
            window.requestAnimationFrame(render_loop);
        }, 20);
    };
    window.requestAnimationFrame(render_loop);
}

let btn_zoom = create_button('increment : ' + increment, canvas_interface, null);
btn_zoom.style.backgroundColor = 'rgba(0,0,0,0)';
btn_zoom.style.borderRadius = '0px';

let slider_perlin = create_slider('increment', canvas_interface, 0.001, 0.1, increment, 0.001);
slider_perlin.addEventListener('input', () => {
    increment = parseFloat(slider_perlin.value);
    btn_zoom.innerText = `increment : ${increment}`;
}
);

let btn_zPlane = create_button('Z : ' + zCut, canvas_interface, null);
btn_zPlane.style.backgroundColor = 'rgba(0,0,0,0)';
btn_zPlane.style.borderRadius = '0px';

let slider_zCut = create_slider('zCut', canvas_interface, 1, 255, zCut, 1);
slider_zCut.addEventListener('input', () => {
    zCut = parseFloat(slider_zCut.value);
    btn_zPlane.innerText = `Z : ${zCut}`;
}
);

document.head.appendChild(script);