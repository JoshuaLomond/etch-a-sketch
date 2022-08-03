/**
 * Finally decided to write comments.
 * 
 * To do:
 * Clean CSS
 * Add background color selector
 * media queries
 */

//Default values
let defaultSize = 64;
let defaultColor = 'rgb(0, 0, 0)';
let defaultBackground = 'rgb(255, 255, 255)';
let mouseDown = false;
let toggleBackground = false;
let toggleColor = true;
let toggleRainbow = false;
let toggleEraser = false;
let gridToggle = false;

//Document is listening for holdng down, to check if should be drawing
document.body.addEventListener('mousedown', () =>
{
    mouseDown = true;
});
document.body.addEventListener('mouseup', () =>
{
    mouseDown = false;
})

//create html elements
let main = document.getElementsByClassName("main")[0];
let options = document.getElementsByClassName('options')[0];
let title = document.getElementsByClassName("title")[0];
let colorContainer = document.getElementsByClassName("color-container")[0];
let colorPicker = document.getElementsByClassName("color-picker")[0];
let backgroundPicker = document.getElementsByClassName("background-picker")[0];
let sliderContainer = document.getElementsByClassName("slider-container")[0];
let slider = document.getElementsByClassName("slider")[0];
let sliderOutput = document.getElementsByClassName('slider-output')[0];
let colorButton = document.getElementById('color');
let rainbowButton = document.getElementById("rainbow");
let eraserButton = document.getElementById("eraser");
let toggleGrid = document.getElementById("grid");
let clearButton = document.getElementById("clear");
let container = document.getElementsByClassName("grid-container")[0];
let windowDimensions = document.getElementsByClassName("window-dimensions")[0];

//size slider logic
slider.oninput = () => sliderOutput.innerHTML = `${slider.value} x ${slider.value}`;
slider.onchange = (e) => buildGrid(e.target.value, gridToggle);

//set innerHTML
sliderOutput.innerHTML = `${slider.value} x ${slider.value}`

//color picker logic
colorPicker.onclick = () =>
{
    if (!toggleColor && toggleRainbow)
    {
        toggleColor = !toggleColor;
        toggleRainbow = !toggleRainbow;

        colorButton.className = "button-selected";
        rainbowButton.className = "button";
    }
    if (!toggleColor && toggleEraser)
    {
        toggleColor = !toggleColor;
        toggleEraser = !toggleEraser;

        colorButton.className = "button-selected";
        eraserButton.className = "button";
    }
}

//backround picker logic
backgroundPicker.oninput = () => 
{
    toggleBackground = true;
    defaultBackground = backgroundPicker.value;
    changeBackground();
}

//color button logic
colorButton.onclick = (e) =>
{
    if (!toggleColor && toggleRainbow)
    {
        toggleColor = !toggleColor;
        toggleRainbow = !toggleRainbow;

        e.target.className = "button-selected";
        rainbowButton.className = "button";
    }
    if (!toggleColor && toggleEraser)
    {
        toggleColor = !toggleColor;
        toggleEraser = !toggleEraser;

        e.target.className = "button-selected";
        eraserButton.className = "button";
    }
}

//rainbow button logic
rainbowButton.onclick = (e) =>
{
    if (!toggleRainbow && toggleColor)
    {
        toggleColor = !toggleColor;
        toggleRainbow = !toggleRainbow;
        e.target.className = "button-selected";
        colorButton.className = "button";
    }
    if (!toggleRainbow && toggleEraser)
    {
        toggleRainbow = !toggleRainbow;
        toggleEraser = !toggleEraser;

        e.target.className = "button-selected";
        eraserButton.className = "button";
    }
};

//eraser logic
eraserButton.onclick = (e) =>
{
    if (!toggleEraser && toggleColor)
    {
        toggleColor = !toggleColor;
        toggleEraser = !toggleEraser;
        e.target.className = "button-selected";
        colorButton.className = "button";
    }
    if (!toggleEraser && toggleRainbow)
    {
        toggleEraser = !toggleEraser;
        toggleRainbow = !toggleRainbow;

        rainbowButton.className = "button";
        eraserButton.className = "button-selected";
    }
}

//toggle grid logic
toggleGrid.onclick = (e) =>
{
    gridToggle = !gridToggle
    if (gridToggle)
    {
        e.target.className = 'button-selected'
    } else
    {
        e.target.className = 'button';
    }
    enableGrid(gridToggle);
}

//clear button logic
clearButton.onclick = () => buildGrid(slider.value, gridToggle);

//Builds the default 64x64 grid and appends to main
buildGrid(64, false);

function randomRGB()
{
    let rgb = new Array(3);
    for (let i = 0; i < 3; i++)
    {
        let x = Math.floor(Math.random() * 256);
        rgb[i] = x;
    }
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function buildGrid(size, grid)
{
    container.innerHTML = ""

    for (let i = 0; i < size*size; i++)
    {
        let div = document.createElement("div");
        
        if (!grid)
        {
            div.className = "grid-item";
        } else
        {
            div.className = 'grid-item-toggle';
        }
        if (toggleBackground)
        {
            div.style.backgroundColor = defaultBackground;
        }

        div.addEventListener('mousedown', changeColor);
        div.addEventListener('mouseover', changeColor);

        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
        container.append(div);
    }
}

function changeColor(e)
{
    if (mouseDown || e.type == 'mousedown')
    {
        if (toggleColor)
        {
            e.target.style.backgroundColor = colorPicker.value;
        } else if (toggleRainbow)
        {
            e.target.style.backgroundColor = randomRGB();
        } else if (toggleEraser)
        {
            e.target.style.backgroundColor = defaultBackground;
        }

        if (!toggleEraser)
        {
            if (e.target.className=='grid-item')
        {
            e.target.className='grid-item-active';
        } else if (e.target.className=='grid-item-toggle')
        {
            e.target.className="grid-item-toggle-active";
        }
        } else
        {
            if (e.target.className=='grid-item-active')
            {
                e.target.className='grid-item';
            } else if (e.target.className=='grid-item-toggle-active')
            {
                e.target.className='grid-item-toggle'
            }
        }
    }
}

function enableGrid(gridToggle)
{
    let gridItems = document.getElementsByClassName('grid-item')
    let gridItemsActive = document.getElementsByClassName('grid-item-active');

    if (gridItems.length == 0) {
        gridItems = document.getElementsByClassName('grid-item-toggle');
        gridItemsActive = document.getElementsByClassName('grid-item-toggle-active');
    }

    Array.from(gridItems).forEach((gridItem) =>
    {
        if (gridToggle)
        {
            gridItem.className = 'grid-item-toggle'
        } else
        {
            gridItem.className = 'grid-item';
        }
    });
    Array.from(gridItemsActive).forEach((gridItem) =>
    {
        if (gridToggle)
        {
            gridItem.className = 'grid-item-toggle-active'
        } else
        {
            gridItem.className = 'grid-item-active';
        }
    });
}

function changeBackground()
{
    if (gridToggle)
    {
        let gridItems = document.getElementsByClassName('grid-item-toggle');

        Array.from(gridItems).forEach((gridItem) =>
        {
                gridItem.style.backgroundColor = backgroundPicker.value;
        });
    } else if (!gridToggle)
    {
        let gridItems = document.getElementsByClassName('grid-item');

        Array.from(gridItems).forEach((gridItem) =>
        {
                gridItem.style.backgroundColor = backgroundPicker.value;
        });
    }
}