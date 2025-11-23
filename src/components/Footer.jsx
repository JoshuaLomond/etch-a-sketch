/**
 * Footer Component
 * Renders the footer with Import and Export buttons for sketch management.
 *
 * @param {Object} props
 * @param {Function} props.onExport - Callback function to handle export action.
 * @param {Function} props.onImport - Callback function to handle import action.
 */
export default function Footer({ onExport, onImport }) {
  return (
    <div className="footer">
      <div className="footer-controls">
        <button onClick={onExport} title="Export Sketch">
          💾 <span>Export</span>
        </button>
        <button onClick={onImport} title="Import Sketch">
          📂 <span>Import</span>
        </button>
      </div>
    </div>
  );
}
