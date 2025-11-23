import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Footer from "./components/Footer";

/**
 * Main Application Component
 * Manages the global state for the Etch-A-Sketch application, including
 * grid size, selected color, eraser mode, and theme.
 */
export default function App() {
  // --- State Management ---

  // Grid size (N x N). Default is 16x16.
  const [gridSize, setGridSize] = useState(16);

  // Currently selected drawing color. Default is black.
  const [selectedColor, setSelectedColor] = useState("#000000");

  // Eraser mode toggle. If true, drawing acts as an eraser.
  const [isEraser, setIsEraser] = useState(false);

  // UI Theme: 'light' or 'dark'.
  const [theme, setTheme] = useState("light");

  // Trigger to force grid reset/clearing without changing other settings.
  const [resetTrigger, setResetTrigger] = useState(0);

  // Visibility state for the grid size slider popover.
  const [showSizePopover, setShowSizePopover] = useState(false);

  // Grid cells state - lifted from Grid component for import/export functionality
  const [cells, setCells] = useState(
    Array(gridSize * gridSize).fill("transparent")
  );

  // --- Effects ---

  // Apply the selected theme to the document root for CSS variable scoping.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // --- Event Handlers ---

  /**
   * Resets the application to its default state:
   * 16x16 grid, black color, eraser off.
   * Also triggers a grid clear.
   */
  const handleReset = () => {
    setGridSize(16);
    setSelectedColor("#000000");
    setIsEraser(false);
    setResetTrigger((prev) => prev + 1);
  };

  /**
   * Clears the current grid content without changing settings.
   */
  const handleClear = () => {
    setResetTrigger((prev) => prev + 1);
  };

  /**
   * Toggles between light and dark themes.
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /**
   * Handles grid size changes.
   * Note: Changing the grid size will automatically trigger a re-render of the Grid component,
   * which initializes a new array of cells, effectively clearing the grid immediately.
   */
  const handleGridSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setGridSize(newSize);
    // The Grid component's useEffect depends on gridSize, so it will
    // automatically reset/clear the grid when this value changes.
  };

  /**
   * Exports the current sketch as a JSON file.
   * Creates a downloadable file containing sketch metadata and cell data.
   */
  const handleExport = () => {
    const sketchData = {
      version: "1.0",
      gridSize: gridSize,
      cells: cells,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(sketchData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sketch-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /**
   * Exports the current sketch as a PNG image.
   * Renders the grid state to an off-screen canvas and triggers a download.
   */
  const handleExportPNG = () => {
    const canvas = document.createElement("canvas");
    const size = 1024; // High resolution for export
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // 1. Fill background based on theme
    // Light theme: #ffffff, Dark theme: #2a2a2a (matching CSS --grid-bg)
    ctx.fillStyle = theme === "light" ? "#ffffff" : "#2a2a2a";
    ctx.fillRect(0, 0, size, size);

    // 2. Draw cells
    const cellSize = size / gridSize;
    cells.forEach((color, index) => {
      if (color !== "transparent") {
        const x = (index % gridSize) * cellSize;
        const y = Math.floor(index / gridSize) * cellSize;
        ctx.fillStyle = color;
        // Draw slightly larger to avoid potential sub-pixel gaps
        ctx.fillRect(x, y, Math.ceil(cellSize), Math.ceil(cellSize));
      }
    });

    // 3. Convert to PNG and download
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `etch-a-sketch-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Imports a sketch from a JSON file.
   * Prompts the user to select a file and loads the sketch data.
   */
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const sketchData = JSON.parse(event.target.result);

          // Validate the imported data
          if (
            !sketchData.version ||
            !sketchData.gridSize ||
            !sketchData.cells
          ) {
            alert("Invalid sketch file format.");
            return;
          }

          // Load the sketch
          setGridSize(sketchData.gridSize);
          setCells(sketchData.cells);
        } catch (error) {
          alert(
            "Error reading sketch file. Please ensure it's a valid sketch file."
          );
          console.error("Import error:", error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="app">
      {/* Fixed Top Toolbar */}
      <div className="toolbar">
        <h1>🎨 Etch-A-Sketch</h1>

        <div className="controls">
          {/* Color Picker Section */}
          <div className="control-group">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setIsEraser(false); // Disable eraser when picking a color
              }}
              title="Choose Color"
            />
          </div>

          {/* Tools Section (Eraser, Clear) */}
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

          {/* Settings Section (Size, Reset, Theme) */}
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

        {/* Grid Size Slider Popover */}
        {showSizePopover && (
          <div className="popover">
            <label>
              Grid Size: {gridSize}×{gridSize}
              <input
                type="range"
                min="8"
                max="64"
                value={gridSize}
                onChange={handleGridSizeChange}
              />
            </label>
          </div>
        )}
      </div>

      {/* Main Grid Area */}
      <div className="grid-container">
        <Grid
          gridSize={gridSize}
          selectedColor={selectedColor}
          isEraser={isEraser}
          resetTrigger={resetTrigger}
          theme={theme}
          cells={cells}
          setCells={setCells}
        />
      </div>

      {/* Footer with Import/Export */}
      {/* Footer with Import/Export */}
      <Footer
        onExport={handleExport}
        onImport={handleImport}
        onExportPNG={handleExportPNG}
      />
    </div>
  );
}
