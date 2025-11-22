import { useEffect, useState, useRef } from "react";

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

  // Initialize grid
  useEffect(() => {
    // Use CSS variable for default background or hardcode based on theme if needed,
    // but here we initialize with 'transparent' so the grid background shows through.
    // Or we can initialize with a specific color.
    // Let's use 'transparent' to allow easy erasing (restoring to grid bg).
    const newCells = Array(gridSize * gridSize).fill("transparent");
    setCells(newCells);
  }, [gridSize, resetTrigger]);

  const handleDraw = (index) => {
    setCells((prev) => {
      const newCells = [...prev];
      // If eraser, set to transparent (shows grid background)
      // If drawing, set to selectedColor
      newCells[index] = isEraser ? "transparent" : selectedColor;
      return newCells;
    });
  };

  // Touch handling for mobile
  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling while drawing
    if (!isDrawing) return;

    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

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
        // We don't need to set bg color here as it's handled by CSS class .grid
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
          data-index={i} // data attribute for touch detection
          className="cell"
          style={{ backgroundColor: color }}
          onMouseDown={() => handleDraw(i)}
          onMouseEnter={() => isDrawing && handleDraw(i)}
        />
      ))}
    </div>
  );
}
