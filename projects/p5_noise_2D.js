let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js";

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
            yoff += 0.01;
            for (let x = 0; x < canvas.width; x++) {
                let index = y * canvas.width * 4 + x * 4;
                let perlinPixel = sketch.noise(xoff, yoff) * 255;
                data[index]     = perlinPixel;
                data[index + 1] = perlinPixel;
                data[index + 2] = perlinPixel;
                data[index + 3] = 255;
                xoff += 0.01;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        ystart += 0.01;

        setTimeout(() => {
            window.requestAnimationFrame(render_loop);
        }, 20);
    };
    window.requestAnimationFrame(render_loop);
}
document.head.appendChild(script);