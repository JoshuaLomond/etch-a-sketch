import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";

export default function App() {
  const [gridSize, setGridSize] = useState(16);
  const [colorMode, setColorMode] = useState("black");
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleReset = () => setResetTrigger((prev) => prev + 1);

  return (
    <div className="app">
      <h1>🎨 Etch-A-Sketch</h1>

      <div className="controls">
        <label>
          Grid size:
          <input
            type="range"
            min="8"
            max="64"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
          />
          <span>
            {gridSize}×{gridSize}
          </span>
        </label>

        <div className="buttons">
          <button onClick={() => setColorMode("black")}>Black</button>
          <button onClick={() => setColorMode("random")}>Random</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <Grid
        gridSize={gridSize}
        colorMode={colorMode}
        resetTrigger={resetTrigger}
      />
    </div>
  );
}
