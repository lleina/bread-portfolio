// Three.js Scene Setup
let scene, camera, renderer, model;
let scrollY = 0;
let currentRotation = 0;

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb1b36b);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        45, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.z = 5;

    // Create renderer
    const canvas = document.getElementById('webgl-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Add lights
    addLights();

    // Load 3D model
    loadModel();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Handle scroll
    window.addEventListener('scroll', onScroll);

    // Start animation loop
    animate();
}

// Add lighting to the scene
function addLights() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light (main key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add a second directional light from the opposite side for fill
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Optional: Add a point light for highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);
}

// Load 3D model (GLTF/GLB format)
function loadModel() {
    const loader = new THREE.GLTFLoader();
    
    // Replace 'model.glb' with your Blender export filename
    // Make sure to place your .glb or .gltf file in the 'models' folder
    loader.load(
        'models/bread.glb', // Path to your 3D model
        
        // onLoad callback
        function (gltf) {
            model = gltf.scene;
            
            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            // Scale the model if needed (adjust this value based on your model size)
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim; // Adjust this value to make model bigger or smaller
            model.scale.setScalar(scale);
            
            scene.add(model);
            console.log('Model loaded successfully!');
            
            // Hide loading screen if you have one
            hideLoading();
        },
        
        // onProgress callback
        function (xhr) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(`Model ${percentComplete.toFixed(2)}% loaded`);
        },
        
        // onError callback
        function (error) {
            console.error('Error loading model:', error);
            console.log('Make sure your .glb/.gltf file is in the "models" folder');
            console.log('Expected path: models/bread.glb');
            
            // Create a placeholder cube if model fails to load
            createPlaceholder();
            hideLoading();
        }
    );
}

// Create a placeholder object if model doesn't load
function createPlaceholder() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xd4a574, // Bread color
        roughness: 0.5,
        metalness: 0.1
    });
    model = new THREE.Mesh(geometry, material);
    scene.add(model);
    console.log('Using placeholder cube - replace with your Blender model');
}

// Hide loading screen
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

// Handle scroll events
function onScroll() {
    scrollY = window.scrollY;
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Calculate scroll progress for each section
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;
    
    // Define section breakpoints (4 sections = 3 transitions)
    const section1End = 0.25;   // Hero section
    const section2End = 0.5;    // About section
    const section3End = 0.75;   // Experience section
    // section4 = 1.0              Contact section
    
    if (model) {
        // Position and rotation based on scroll progress
        if (scrollProgress < section1End) {
            // Section 1: Hero - Object starts moving LEFT immediately with scroll
            const progress = scrollProgress / section1End;
            model.position.x = 2 - (progress * 2); // Start moving left immediately (2 to 0)
            model.position.y = 0;
            model.rotation.y = -Math.PI / 4 * progress; // Start rotating slightly
            model.rotation.x = 0;
            model.rotation.z = 0;
            
        } else if (scrollProgress < section2End) {
            // Section 2: About - Object continues to LEFT side, shows RIGHT side of object
            const progress = (scrollProgress - section1End) / (section2End - section1End);
            model.position.x = 0 - (progress * 2); // Continue from center (0) to left (-2)
            model.position.y = 0;
            model.rotation.y = -Math.PI / 4 - (Math.PI / 4 * progress); // Continue rotating to -90 degrees
            model.rotation.x = 0;
            model.rotation.z = 0;
            
        } else if (scrollProgress < section3End) {
            // Section 3: Experience - Object in CENTER, SMOOTHLY rotates to show BOTTOM (nutrition label)
            const progress = (scrollProgress - section2End) / (section3End - section2End);
            model.position.x = -2 + (progress * 2); // Move from left (-2) to center (0)
            model.position.y = 0;
            model.rotation.y = -Math.PI / 2; // Keep at -90 degrees
            model.rotation.x = -Math.PI / 2 * progress; // Smoothly rotate to show bottom
            model.rotation.z = 0;
            
        } else {
            // Section 4: Contact - Object SMOOTHLY rotates to show TOP (like top of bag)
            const progress = (scrollProgress - section3End) / (1 - section3End);
            model.position.x = 0;
            model.position.y = 0;
            model.rotation.y = -Math.PI / 2;
            model.rotation.x = -Math.PI / 2 + (Math.PI * progress); // Smoothly rotate from bottom to top
            model.rotation.z = 0;
        }
    }

    renderer.render(scene, camera);
}

// Start the application when page loads
window.addEventListener('DOMContentLoaded', init);
