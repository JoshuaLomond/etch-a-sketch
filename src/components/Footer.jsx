/**
 * Footer Component
 * Renders the footer with Import and Export buttons for sketch management.
 *
 * @param {Object} props
 * @param {Function} props.onExport - Callback function to handle export action.
 * @param {Function} props.onImport - Callback function to handle import action.
 */
export default function Footer({ onExport, onImport, onExportPNG }) {
  return (
    <div className="footer">
      <div className="footer-controls">
        <button onClick={onExport} title="Export Sketch">
          💾 <span>Export JSON</span>
        </button>
        <button onClick={onExportPNG} title="Export as PNG">
          🖼️ <span>Export PNG</span>
        </button>
        <button onClick={onImport} title="Import Sketch">
          📂 <span>Import JSON</span>
        </button>
      </div>
    </div>
  );
}
