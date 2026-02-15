# 3D Portfolio Website

An interactive portfolio website featuring scroll-based 3D animation built with Three.js and Blender. The site showcases a 3D bread model with different perspectives revealed as users scroll through the page.

## ✨ Features

- **Scroll-driven 3D animation** - 3D object moves and rotates based on scroll position
- **Smooth transitions** - Fluid camera angles showing different sides of the model
- **Modern UI** - Clean, Apple-inspired design with minimalist typography
- **Responsive layout** - Adapts to different screen sizes
- **WebGL rendering** - Hardware-accelerated 3D graphics using Three.js

## 🎨 Design Flow

As visitors scroll through the site, they experience:

1. **Hero Section** - Introduction with the 3D object positioned on the right
2. **About Section** - Object transitions to the left, rotating to show its side profile
3. **Experience Section** - Object centers and rotates to display the bottom (resume/nutrition label)
4. **Contact Section** - Final rotation revealing the top of the object

## 🛠️ Technologies Used

- **Three.js** - 3D graphics library for WebGL rendering
- **GLTFLoader** - Loading 3D models exported from Blender
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling and animations
- **Blender** - 3D modeling and texturing

## 🚀 Running Locally

Clone the repository and start a local server:

```bash
# Clone the repository
git clone https://github.com/lleina/bread-portfolio.git
cd bread-portfolio

# Start a local server (choose one):

# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open your browser to `http://localhost:8000` (or the port shown).

**Note:** A local server is required because browsers restrict loading local 3D model files directly.

## 📁 Project Structure

```
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── main.js             # Three.js logic and scroll animation
├── models/             # 3D model assets
│   └── bread.glb       # Blender-exported 3D model
└── README.md           # Project documentation
```

## 🎨 Customization

The project is designed to be easily customizable:

### Content
Edit `index.html` to update text, sections, and structure.

### Styling
Modify `style.css` to change colors, fonts, spacing, and layout.

### 3D Animation
Adjust `main.js` to customize:
- Model position and scale
- Rotation speeds and angles
- Section breakpoints
- Camera settings

### 3D Model
Replace `models/bread.glb` with your own Blender export in glTF Binary (.glb) format.

## 🌐 Live Demo

Visit the live site: [Coming Soon]

---

Built with ❤️ using Three.js and Blender
