canvas_interface.style.display = 'none';
canvas.style.display = 'none';

let text = document.createElement('div');
text.innerText = 'Hello World';
text.classList.add('center');
main.appendChild(text);

let textRect = text.getBoundingClientRect();
// vector starting from the center of the text
let start = { x: textRect.left + textRect.width / 2, y: textRect.top + textRect.height / 2 };

// vector from the center of the text to the mouse
let end = { x: 0, y: 0 };

class textLayer {
          //crate a layer from the cloned element
          constructor(text) {
                    this.layer = text.cloneNode(true);
                    this.layer.classList.add('center');
                    return this;
          }
          update(index) {
                    this.layer.style.transform = `translate(-50%, -50%) translateX(${end.x * index}px) translateY(${end.y * index}px)`;
          }
}

function updateLayers() {
          for (let i = 0; i < textLayers.length; i++) {
                    textLayers[i].update(i);
          }
}

let textLayers = [];
//create 15 layers
for (let i = 0; i < 15; i++) {
          textLayers.push(new textLayer(text));
          main.appendChild(textLayers[i].layer);
}

let letter_offset = 0.02;

document.addEventListener('mousemove', (event) => {
          end.x = event.clientX - start.x;
          end.y = event.clientY - start.y;
          end.x *= letter_offset;
          end.y *= letter_offset;
          updateLayers();
});