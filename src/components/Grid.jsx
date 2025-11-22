import { useEffect, useState, useRef } from "react";

/**
 * Grid Component
 * Renders the interactive drawing grid. Handles drawing logic for both mouse and touch events.
 *
 * @param {Object} props
 * @param {number} props.gridSize - The dimension of the grid (N x N).
 * @param {string} props.selectedColor - The current color to draw with.
 * @param {boolean} props.isEraser - Whether the eraser tool is active.
 * @param {number} props.resetTrigger - Incrementing counter to trigger a grid clear.
 * @param {string} props.theme - Current UI theme ('light' or 'dark').
 */
export default function Grid({
  gridSize,
  selectedColor,
  isEraser,
  resetTrigger,
  theme,
}) {
  const [cells, setCells] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef(null);

  /**
   * Effect: Initialize or Reset Grid
   * Re-creates the grid cells array whenever the grid size changes or the reset trigger is fired.
   * Cells are initialized with 'transparent' to show the underlying grid background.
   */
  useEffect(() => {
    const newCells = Array(gridSize * gridSize).fill("transparent");
    setCells(newCells);
  }, [gridSize, resetTrigger]);

  /**
   * Updates the color of a specific cell.
   * If Eraser mode is active, sets the cell to 'transparent'.
   * Otherwise, sets it to the selected color.
   *
   * @param {number} index - The index of the cell to update.
   */
  const handleDraw = (index) => {
    setCells((prev) => {
      const newCells = [...prev];
      newCells[index] = isEraser ? "transparent" : selectedColor;
      return newCells;
    });
  };

  /**
   * Handles touch move events for mobile devices.
   * Calculates the element under the user's finger to enable continuous drawing while dragging.
   *
   * @param {TouchEvent} e - The touch event object.
   */
  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default browser scrolling behavior
    if (!isDrawing) return;

    const touch = e.touches[0];
    // Identify the DOM element at the touch coordinates
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    // If the target is a valid cell, update its color
    if (target && target.dataset.index) {
      handleDraw(Number(target.dataset.index));
    }
  };

  return (
    <div
      ref={gridRef}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
      onTouchStart={() => setIsDrawing(true)}
      onTouchEnd={() => setIsDrawing(false)}
      onTouchMove={handleTouchMove}
    >
      {cells.map((color, i) => (
        <div
          key={i}
          data-index={i} // Used for touch detection
          className="cell"
          style={{ backgroundColor: color }}
          onMouseDown={() => handleDraw(i)}
          onMouseEnter={() => isDrawing && handleDraw(i)}
        />
      ))}
    </div>
  );
}
