let selected = undefined;
let itemOffset = { x: 0, y: 0 };

let handle_clickDown = () => {
    let lastItem = undefined;
    for (let i=0 ; i < squares.length; i++) {
        if (testAABB(mousePosition, squares[i])) {
            lastItem = i;
        }
    }
    selected = lastItem;

    if (selected == undefined) return;
    itemOffset.x = squares[selected].position.xA - mousePosition.x;
    itemOffset.y = squares[selected].position.yA - mousePosition.y;
    if (selectionState) {
        selectedItems.push(squares[selected]);
    } else {
        selectedItems = selectedItems.filter(item => item != squares[selected]);
    }
}

let handle_clickUp = () => {
    selected = undefined; // Change to undefined
    itemOffset = { x: 0, y: 0 };
};

canvas.onmousedown = handle_clickDown;
canvas.onmouseup = handle_clickUp;

let rect = canvas.getBoundingClientRect();
let mousePosition = { x: 0, y: 0 };

let testAABB = (mouse, item) => {
    if (mouse.x > item.position.xA && mouse.x < item.position.xB && mouse.y > item.position.yA && mouse.y < item.position.yB) {
        return true;
    }
    return false;
}

class Square {
    static width = 50;
    constructor(x, y, color, name) {
        this.position = {
            xA: x,
            yA: y,
            xB: x + Square.width,
            yB: y + Square.width
    }
        this.color = color;
        this.name = name;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.position.xA, this.position.yA, Square.width, Square.width);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    highlight() {
        ctx.beginPath();
        ctx.rect(this.position.xA, this.position.yA, Square.width, Square.width);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

let squares = [];

let square1 = new Square(100, 100, 'blue');
let square2 = new Square(200, 100, 'orange');
let square3 = new Square(100, 200, 'magenta');
let square4 = new Square(200, 200, 'lime');

squares.push(square1, square2, square3, square4);

let selectedItems = [];
let selectionState = false;

let toggleSelection = () => {
    selectionState = !selectionState;
    toggleSelection_button.style.border = selectionState ? '2px solid red' : '2px solid black';
}
let toggleSelection_button = create_button('Toggle Selection', canvas_interface, toggleSelection);

canvas.onmousemove = (event) => {
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;

    if (selected != undefined) {
        squares[selected].position.xA = mousePosition.x + itemOffset.x;
        squares[selected].position.yA = mousePosition.y + itemOffset.y;
        squares[selected].position.xB = squares[selected].position.xA + Square.width;
        squares[selected].position.yB = squares[selected].position.yA + Square.width;
    }
}

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    squares.forEach(square => {
        square.draw();
    });

    if (selectedItems.length > 0) {
        selectedItems.forEach(item => {
            item.highlight();
        })
    }
    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 10);
};

window.requestAnimationFrame(main_loop);