# 🎨 Etch-A-Sketch (React + Vite)

An interactive **Etch-A-Sketch** web application built with **React** and **Vite**.

Users can draw by clicking and dragging across a customizable grid, pick any color, use an eraser, and toggle between light and dark themes.

The app also supports saving your work as a JSON file or exporting a high-quality PNG image of your sketch.

The layout is fully responsive, scaling across desktops, laptops, tablets, and mobile devices.

## 🚀 Features

- ✏️ **Interactive Drawing** — Click and drag (or touch and drag) to draw.

- 🎨 **Color Picker** — Choose any color you like using the native color input.

- 🧹 **Eraser Mode** — Correct mistakes easily.

- 🌓 **Dark Mode** — Toggle between light and dark themes.

- 🔄 **Reset & Clear** — Clear the grid or reset all settings instantly.

- 📏 **Adjustable Grid Size** — Configurable from 8×8 up to 64×64.

- 💾 **Import & Export** — Save your sketches as JSON files and load them back later.

- 🖼️ **Export as PNG** — Download a high-resolution PNG of your sketch (without grid lines!).

- 📱 **Responsive Design** — Adapts seamlessly to any screen size.

- ⚡ **Fast Development** — Powered by [Vite](https://vitejs.dev/).

---

## 🧩 Tech Stack

- **React** – Component-based UI library.
- **Vite** – Lightning-fast development and build tool.
- **CSS Grid & Flexbox** – For responsive layout.
- **JavaScript** – Modern JavaScript features.

---

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/JoshuaLomond/etch-a-sketch.git
   cd etch-a-sketch
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   `http://localhost:5173/`

## 🧱 Project Structure

```plaintext
etch-a-sketch/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Grid.jsx
        └── Footer.jsx
```

## 📱 Responsive Design

The app is designed to adapt to all major screen sizes:

- **Desktops & Laptops**: Fixed, centered grid area.

- **Tablets**: Moderate scaling and spacing adjustments.

- **Mobile Phones**: Grid shrinks to fit viewport width (90vw), with touch-optimized controls.

- **CSS Techniques**:
  - `aspect-ratio` for perfect square grids.
  - `clamp()` for adaptive font sizing.
  - `min()` and `vw` units for fluid width.
  - `backdrop-filter` for glassmorphism effects.

## 🧑‍💻 Future Improvements

- 🌈 Rainbow mode (random colors per cell).
- ↩️ Undo/Redo functionality.
- 🖌️ Brush size options.

## 📜 License

This project is open-source and available under the MIT License.

## 🖋️ Author

Developed by [Joshua Lomond](https://github.com/JoshuaLomond)
