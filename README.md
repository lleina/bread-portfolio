# 3D Bread Portfolio Website

A personal portfolio website featuring a 3D Blender object (bread with resume as nutritional label) that rotates as users scroll down the page, built with Three.js.

## 📁 Project Structure

```
bread_website/
├── index.html          # Main HTML file
├── style.css           # Styling and layout
├── main.js             # Three.js logic and scroll animation
├── models/             # 👈 PLACE YOUR 3D MODEL HERE
│   └── bread.glb       # Your exported Blender model
└── README.md           # This file
```

## 🥖 How to Add Your Blender Object

### Step 1: Export from Blender

1. **Open your bread model in Blender**
2. **Select all objects** you want to export (the bread and nutritional label)
3. **Go to File → Export → glTF 2.0 (.glb/.gltf)**
4. **In the export settings:**
   - Format: Choose **glTF Binary (.glb)** (recommended - single file)
   - Include: Check these options:
     - ✅ Selected Objects (if you only selected what you need)
     - ✅ Apply Modifiers
     - ✅ UVs
     - ✅ Normals
     - ✅ Materials
     - ✅ Textures (important for the nutritional label!)
   - Transform:
     - ✅ +Y Up (so your model is oriented correctly)
   - Geometry:
     - ✅ Compression (makes file smaller)
5. **Name the file `bread.glb`**
6. **Save it in the `models/` folder** of this project

### Step 2: Place the Model in the Correct Folder

```
models/bread.glb    👈 Your Blender export goes here
```

The JavaScript is already configured to load `models/bread.glb`. If you want to use a different filename, edit line 109 in `main.js`:

```javascript
loader.load('models/YOUR_FILENAME.glb', ...
```

## 🚀 Running the Website

### Option 1: Using Python (Simplest)

```bash
# In the project directory, run:
python3 -m http.server 8000

# Then open your browser to:
# http://localhost:8000
```

### Option 2: Using Node.js (http-server)

```bash
# Install http-server globally (one time only):
npm install -g http-server

# Run the server:
http-server

# Open your browser to the URL shown (usually http://localhost:8080)
```

### Option 3: Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization

### Adjusting Model Size

If your model appears too large or too small, edit `main.js` around line 125:

```javascript
const scale = 2 / maxDim; // Change the number 2 to make it bigger or smaller
```

### Changing Rotation Speed

To make the object rotate faster or slower with scroll, edit `main.js` around line 189:

```javascript
model.rotation.y = scrollProgress * Math.PI * 2; // Multiply by 4 for 2 full rotations, etc.
```

### Changing Colors and Styling

Edit `style.css` to change:
- Background color
- Text colors
- Section layouts
- Fonts

### Adding More Content

Edit `index.html` to add more sections, projects, or information. Each `<section>` creates more scroll space, which means more rotation!

## 🔧 Troubleshooting

### Model Not Showing Up?

1. **Check the browser console** (F12 → Console tab)
   - Look for error messages
   - It will tell you if the model failed to load

2. **Verify the file path**
   - Make sure your file is at `models/bread.glb`
   - File names are case-sensitive on some systems!

3. **Check the file format**
   - Only `.glb` or `.gltf` formats work
   - `.blend` files won't work - you must export first

4. **If you see a brown cube**
   - This is a placeholder! It means the model didn't load
   - Check the console for the exact error

### Model is Upside Down or Sideways?

In Blender export settings, make sure **+Y Up** is checked.

Or, you can rotate it in the code (`main.js`):

```javascript
model.rotation.x = Math.PI / 2; // Rotate 90 degrees on X axis
```

### Textures Not Showing?

Make sure in Blender export:
- Materials are included
- Textures are included
- Image textures are properly packed or in the same folder

## 📝 Future Enhancements

- Add more interactive elements
- Implement click interactions with the 3D model
- Add loading progress bar
- Optimize model for web (compress textures, reduce polygons)
- Add animations from Blender
- Mobile touch controls

## 🛠️ Technologies Used

- **Three.js** - 3D graphics library
- **GLTFLoader** - For loading Blender models
- **HTML/CSS/JavaScript** - Web technologies
- **Blender** - 3D modeling

## 📚 Helpful Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Blender GLTF Export Guide](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
- [GLTF Format Specification](https://www.khronos.org/gltf/)

---

**Note:** This website requires a local server to run because browsers restrict loading local files directly. Use one of the methods in the "Running the Website" section above.

Enjoy your 3D bread portfolio! 🍞✨
