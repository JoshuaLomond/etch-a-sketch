import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid";

export default function App() {
  const [gridSize, setGridSize] = useState(16);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const [theme, setTheme] = useState("light");
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showSizePopover, setShowSizePopover] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleReset = () => {
    setGridSize(16);
    setSelectedColor("#000000");
    setIsEraser(false);
    setResetTrigger((prev) => prev + 1);
  };

  const handleClear = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <div className="toolbar">
        <h1>🎨 Etch-A-Sketch</h1>

        <div className="controls">
          {/* Color Picker */}
          <div className="control-group">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setIsEraser(false);
              }}
              title="Choose Color"
            />
          </div>

          {/* Tools */}
          <div className="control-group">
            <button
              className={isEraser ? "active" : ""}
              onClick={() => setIsEraser(!isEraser)}
              title="Eraser"
            >
              🧹 <span>Eraser</span>
            </button>
            <button onClick={handleClear} title="Clear Grid">
              🗑️ <span>Clear</span>
            </button>
          </div>

          {/* Settings */}
          <div className="control-group">
            <button
              onClick={() => setShowSizePopover(!showSizePopover)}
              className={showSizePopover ? "active" : ""}
              title="Grid Size"
            >
              📏 <span>Size</span>
            </button>
            <button onClick={handleReset} title="Reset All">
              🔄 <span>Reset</span>
            </button>
            <button onClick={toggleTheme} title="Toggle Theme">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Grid Size Popover */}
        {showSizePopover && (
          <div className="popover">
            <label>
              Grid Size: {gridSize}×{gridSize}
              <input
                type="range"
                min="8"
                max="64"
                value={gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
              />
            </label>
          </div>
        )}
      </div>

      <div className="grid-container">
        <Grid
          gridSize={gridSize}
          selectedColor={selectedColor}
          isEraser={isEraser}
          resetTrigger={resetTrigger}
          theme={theme}
        />
      </div>
    </div>
  );
}
