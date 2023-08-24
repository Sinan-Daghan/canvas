let state = true;

let currentItem;
let currentItemIndex = 1;
let itemOffset = { x: 0, y: 0 };

let handle_clickDown = () => {
    let itemToToggle;
    squares.forEach((item, index) => {
        if (testAABB(mousePosition, item)) {
            itemToToggle = item;
            currentItemIndex = index;
        }
    })

    if (itemToToggle) {
        currentItem = itemToToggle;
        itemOffset.x = itemToToggle.position.xA - mousePosition.x;
        itemOffset.y = itemToToggle.position.yA - mousePosition.y;
    }
}

let handle_clickUp = () => {
    currentItem = false;
    itemOffset = { x: 0, y: 0 };
    console.log(itemOffset);
}

let handle_click = () => {
    if (state) {
        handle_clickDown();
    } else {
        handle_clickUp();
    }
    state = !state;
}
onclick = handle_click;

// onmousedown = handle_clickDown;
// onmouseup = handle_clickUp;

let rect = canvas.getBoundingClientRect();
let mousePosition = { x: 0, y: 0 };

document.addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
});

let testAABB = (mouse, item) => {
    if (mouse.x > item.position.xA && mouse.x < item.position.xB && mouse.y > item.position.yA && mouse.y < item.position.yB) {
        return true;
    }
    return false;
}

class Square {
    static width = 50;
    constructor(x, y, color) {
        this.position = {
            xA: x,
            yA: y,
            xB: x + Square.width,
            yB: y + Square.width
    }
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.position.xA, this.position.yA, Square.width, Square.width);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let squares = [];

let square1 = new Square(100, 100, 'red');
let square2 = new Square(200, 100, 'blue');


squares.push(square1, square2);

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state && currentItem != false) {
        squares[currentItemIndex].position.xA = mousePosition.x + itemOffset.x;
        squares[currentItemIndex].position.yA = mousePosition.y + itemOffset.y;
        squares[currentItemIndex].position.xB = mousePosition.x + itemOffset.x + Square.width;
        squares[currentItemIndex].position.yB = mousePosition.y + itemOffset.y + Square.width;
    };

    squares.forEach(square => {
        square.draw();
    });

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 1000);
}
window.requestAnimationFrame(main_loop);