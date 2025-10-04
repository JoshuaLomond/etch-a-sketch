import { useEffect, useState } from "react";

export default function Grid({ gridSize, colorMode, resetTrigger }) {
  const [cells, setCells] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const newCells = Array(gridSize * gridSize).fill("#ffffff");
    setCells(newCells);
  }, [gridSize, resetTrigger]);

  const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;

  const handleDraw = (index) => {
    setCells((prev) => {
      const newCells = [...prev];
      newCells[index] = colorMode === "random" ? getRandomColor() : "#000000";
      return newCells;
    });
  };

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
    >
      {cells.map((color, i) => (
        <div
          key={i}
          className="cell"
          style={{ backgroundColor: color }}
          onMouseDown={() => handleDraw(i)}
          onMouseEnter={() => isDrawing && handleDraw(i)}
        />
      ))}
    </div>
  );
}
