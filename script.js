let mouseDown = false;
let defaultSize = 32;

let main = document.getElementsByClassName("main")[0];

let options = document.createElement("div");
options.className = 'options';

let title = document.createElement("div");
title.className = 'title'
title.innerHTML = 'Etch-a-sketch'
options.append(title);

let sliderContainer = document.createElement("div");
sliderContainer.className = 'slider-container'

let slider = document.createElement("input");
slider.className = 'slider';
slider.type ='range';slider.min='16';slider.max='64';slider.value='32';

let sliderOutput = document.createElement("div");
sliderOutput.className = 'slider-output';
sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
slider.oninput = function() {
    sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
}
slider.onchange = (e) => updateSize(e.target.value)

sliderContainer.append(slider);
sliderContainer.append(sliderOutput);
options.append(sliderContainer);

main.append(options);

let container = document.createElement("div");
container.className = 'grid-container';
container.addEventListener('mouseleave', (e) => {
    mouseDown = false;
})

for (let i = 0; i < 32*32; i++) {
    let div = document.createElement("div");
    div.className = "grid-item";

    div.addEventListener('mousedown', (e) => {
        mouseDown = true;
        if (mouseDown) {
            div.style.backgroundColor = randomRGB();
        }
    });
    div.addEventListener('mouseup', (e) => {
        mouseDown = false;
    });
    div.addEventListener('mouseover', (e) => {
        if (mouseDown) {
            div.style.backgroundColor = randomRGB();
        }
    });

    container.append(div);
}
main.append(container);

function randomRGB() {
    let rgb = new Array(3);

    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * 256);
        rgb[i] = x;
    }

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function updateSize(size) {
    container.innerHTML = ""

    for (let i = 0; i < size*size; i++) {
        let div = document.createElement("div");
        div.className = "grid-item";
    
        div.addEventListener('mousedown', (e) => {
            mouseDown = true;
            if (mouseDown) {
                div.style.backgroundColor = randomRGB();
            }
        });
        div.addEventListener('mouseup', (e) => {
            mouseDown = false;
        });
        div.addEventListener('mouseover', (e) => {
            if (mouseDown) {
                div.style.backgroundColor = randomRGB();
            }
        });

        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
        container.append(div);
    }
}