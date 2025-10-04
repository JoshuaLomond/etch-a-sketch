# 🎨 Etch-A-Sketch (React + Vite)

An interactive **Etch-A-Sketch** web app built with **React** and **Vite**.

Users can draw by clicking and dragging across a grid, change grid size, switch color modes, and reset the board. The layout is fully responsive — scaling beautifully across desktops, laptops, tablets, and mobile devices.

## 🚀 Features

- ✏️ **Interactive drawing** — click and drag to draw on a grid  
- 🎨 **Color modes** — choose between black or random colors  
- 🔄 **Reset button** — clear the entire grid instantly  
- 📏 **Adjustable grid size** — from 8×8 up to 64×64  
- 📱 **Responsive design** — adapts seamlessly to any screen size  
- ⚡ **Fast development build** with [Vite](https://vitejs.dev/)

---

## 🧩 Tech Stack

- **React** – component-based UI library  
- **Vite** – lightning-fast development and build tool  
- **CSS Grid & Flexbox** – for responsive layout  
- **JavaScript (ES6+)**

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
        └── Grid.jsx
```

## 📱 Responsive Design

The app is designed to adapt to all major screen sizes:

- Desktops & laptops — fixed 600px grid area

- Tablets — moderate scaling and spacing adjustments

- Mobile phones — grid shrinks to fit viewport width (90 vw)

- Uses CSS techniques such as:

  - aspect-ratio for perfect square grids

  - clamp() for adaptive font sizing

  - min() and vw units for fluid width

  - flex-wrap and media queries for compact controls

## 🧑‍💻 Future Improvements

- 🌓 Dark mode toggle

- 🎨 Color picker for custom colors

- 💾 Save and load drawings

- 📱 Enhanced touch drawing support

## 📜 License

This project is open-source and available under the MIT License

## 🖋️ Author

Developed by [Joshua Lomond](https://github.com/JoshuaLomond)
