canvas.style.display = 'none';
create_button('create_grid', canvas_interface, create10printGrid);

let wrapper = document.createElement("div");
wrapper.classList.add("wrapper_10_print");
body.appendChild(wrapper);

function create10printGrid() {

          wrapper.innerHTML = "";
          for (let i = 0 ; i < 100 ; i++) {
                    let cell = document.createElement("div");
                    if (Math.random() > 0.5) {
                          cell.classList.add("diagonal_A");
                    } else {
                          cell.classList.add("diagonal_B");
                    }
                    wrapper.appendChild(cell);
          }
}