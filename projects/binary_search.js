class Unit {
    static width = 10;

    constructor(height, x = 0) {
        this.height = height;
        this.x = x;
        this.y = canvas.height - this.height;
        this.color = 'black';
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, Unit.width, this.height);
    }
}

let wrapper = () => {
    buttonEnbaled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let units = [];
    function createArray() {
        let height = 3;
        for (let i = 0 ; i < canvas.width / 10 ; i++) {
            units.push(new Unit(height, i * 10))
            height += random(0, 10);
            height = Math.ceil(height);
        }
    }
    createArray();

    units.forEach(unit => {
        unit.draw();
    })

    function draw(index, color) {
        units[index].color = color;
        units[index].draw();
    }

    binarySearch = (array, target) => {
        let left = 0;
        let right = array.length - 1;

        let i = 1;
        while (left <= right) {

            let middle = Math.floor((left + right) / 2);
            let middleItem = array[middle].height;

            if ( target == middleItem ) {
                return[middle, i];
            }
            if ( target < middleItem) {
                right = middle;
            } else {
                left = middle + 1;
            }

            setTimeout(() => {
                draw(middle, 'red');
            }, i * 1000);
            setTimeout(() => {
                draw(middle, 'black');
            }, i * 1000 + 1000);
            i++;
        }
        return -1;
    }
    let random_index = Math.floor(random(0, units.length - 1));

    let value = units[random_index].height;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(random_index * 10, 0, 10, canvas.height);

    let result = binarySearch(units, value);

    setTimeout(() => {
        draw(result[0], 'green');
        buttonEnbaled = true;
    }, result[1] * 1000);

}

let buttonEnbaled = true;
create_button('Start Binary Search', canvas_interface, () => {
    if(buttonEnbaled) {
        wrapper();
    }
});