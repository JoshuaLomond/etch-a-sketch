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
 * @param {Array} props.cells - The array of cell colors.
 * @param {Function} props.setCells - Function to update the cells array.
 */
export default function Grid({
  gridSize,
  selectedColor,
  isEraser,
  resetTrigger,
  theme,
  cells,
  setCells,
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef(null);

  /**
   * Effect: Reset Grid
   * Re-creates the grid cells array when the reset trigger is fired.
   * Cells are initialized with 'transparent' to show the underlying grid background.
   */
  const prevResetTrigger = useRef(resetTrigger);

  useEffect(() => {
    const resetTriggered = prevResetTrigger.current !== resetTrigger;
    const sizeMismatch = cells.length !== gridSize * gridSize;

    // Reset cells if:
    // 1. Reset/clear was triggered (resetTrigger changed), OR
    // 2. Grid size changed and array size doesn't match (but not import)
    if (resetTriggered || sizeMismatch) {
      setCells(Array(gridSize * gridSize).fill("transparent"));
    }

    prevResetTrigger.current = resetTrigger;
  }, [gridSize, resetTrigger, setCells, cells.length]);

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
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent default drag behavior
        setIsDrawing(true);
      }}
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
