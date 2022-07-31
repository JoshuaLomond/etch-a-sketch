/**
 * Finally decided to write comments.
 * 
 * To do:
 * Make the event listeners for holding left click work
 * Clean CSS
 * Add color selector/background color selector
 * Add eraser
 * Toggle grid
 */

//Default values
let defaultSize = 64;
let mouseDown = false;
let toggleRainbow = false;

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});


//Building html structure
let main = document.getElementsByClassName("main")[0];
let options = document.createElement("div");
let title = document.createElement("div");
let sliderContainer = document.createElement("div");
let slider = document.createElement("input");
let sliderOutput = document.createElement("div");
let rainbowButton = document.createElement("div");
let clearButton = document.createElement("div");
let container = document.createElement("div");

options.className = 'options';
title.className = 'title'
sliderContainer.className = 'slider-container'
slider.className = 'slider';
rainbowButton.className = 'button';
sliderOutput.className = 'slider-output';
clearButton.className = 'button';
container.className = 'grid-container';

slider.type ='range';slider.min='1';slider.max='128';slider.value='64';

title.innerHTML = 'Etch-a-sketch'
sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
rainbowButton.innerHTML = 'Toggle Rainbow';
clearButton.innerHTML = 'Clear';

options.append(title);

sliderContainer.append(slider);
sliderContainer.append(sliderOutput);

options.append(sliderContainer);
options.append(rainbowButton);
options.append(clearButton);

main.append(options);
main.append(container);

//Builds the default 64x64 brid and appends to main
buildGrid(64);

slider.oninput = function() {
    sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
}
slider.onchange = (e) => buildGrid(e.target.value)

rainbowButton.onclick = (e) => {
    if (!toggleRainbow) {
        toggleRainbow = true;
        e.target.className = 'button-selected';
    } else {
        toggleRainbow = false;
        e.target.className = 'button';
    }
};

clearButton.onclick = () => buildGrid(slider.value);

function randomRGB() {
    let rgb = new Array(3);
    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * 256);
        rgb[i] = x;
    }
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function buildGrid(size) {
    container.innerHTML = ""
    for (let i = 0; i < size*size; i++) {
        let div = document.createElement("div");
        div.className = "grid-item";

        div.addEventListener('mousedown', changeColor);
        div.addEventListener('mouseover', changeColor);

        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
        container.append(div);
    }
}

function changeColor(e) {
    if (mouseDown || e.type == 'mousedown') {
        if (!toggleRainbow) {
            e.target.style.backgroundColor = 'black';
        } else if (toggleRainbow) {
            e.target.style.backgroundColor = randomRGB();
        }
    }
}