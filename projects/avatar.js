class Tile {
    static length = 80;
    constructor(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, Tile.length, Tile.length);
    }
}


let drawAvatar = () => {

    for ( x = 0 ; x < 3 ; x++) {
        for ( y = 0 ; y < 5 ; y++) {

            if (Math.random() > 0.5) {
                color = `hsl( 25 50% 50% )`;
            } else {
                color = '#f0f0f0';
            }

            new Tile(x * Tile.length, y * Tile.length, color);
            new Tile((4 - x) * Tile.length, y * Tile.length, color);
        }
    }

}

create_button('Draw Avatar', 'drawAvatar', canvas_interface , drawAvatar);