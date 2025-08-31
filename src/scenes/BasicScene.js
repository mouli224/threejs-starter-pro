import * as THREE from 'three';

/**
 * BasicScene Class
 * Creates a simple 3D scene with a rotating cube
 * Features:
 * - Single rotating cube with modern styling
 * - Basic lighting setup
 * - Smooth animation loop
 */
export class BasicScene {
    constructor() {
        // Core Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        // Scene objects
        this.cube = null;
        
        // Animation control
        this.animationId = null;
        this.isAnimating = false;
    }

    /**
     * Initialize the basic scene
     * @param {string} containerId - DOM element ID to attach the renderer
     */
    init(containerId) {
        console.log('📦 Initializing basic scene...');
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('❌ Container element not found:', containerId);
            return;
        }
        
        // Create core components
        this.createScene();
        this.createCamera();
        this.createRenderer(container);
        
        // Add scene content
        this.createCube();
        this.addLights();

        // Start animation
        this.isAnimating = true;
        this.animate();
        
        console.log('✅ Basic scene initialized');
    }

    /**
     * Create the Three.js scene with dark background
     */
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0f); // Dark minimalistic background
    }

    /**
     * Create perspective camera with proper aspect ratio
     */
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        this.camera.position.z = 5; // Position camera back from origin
    }

    /**
     * Create WebGL renderer with anti-aliasing and shadows
     * @param {HTMLElement} container - DOM element to attach renderer
     */
    createRenderer(container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);
    }

    /**
     * Create the main cube with modern material
     */
    createCube() {
        // Create cube geometry
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        // Create modern material with indigo color
        const material = new THREE.MeshLambertMaterial({ 
            color: 0x6366f1, // Modern indigo color
            transparent: false,
            opacity: 1.0
        });
        
        // Create mesh and configure properties
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.cube.position.set(0, 0, 0); // Ensure it's at origin
        
        // Add to scene
        this.scene.add(this.cube);
    }

    /**
     * Add lighting setup for proper illumination
     * Includes ambient, directional, and point lights
     */
    addLights() {
        // Ambient light for overall scene brightness
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light for main illumination and shadows
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light for accent lighting
        const pointLight = new THREE.PointLight(0x8b5cf6, 0.5, 100);
        pointLight.position.set(-5, -5, 5);
        this.scene.add(pointLight);
    }

    /**
     * Main animation loop
     * Handles cube rotation and rendering
     */
    animate() {
        if (!this.isAnimating) return;

        // Schedule next frame
        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotate cube smoothly
        if (this.cube) {
            this.cube.rotation.x += 0.005;
            this.cube.rotation.y += 0.005;
        }

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Pause the animation loop
     */
    pause() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    /**
     * Resume the animation loop
     */
    resume() {
        this.isAnimating = true;
        this.animate();
    }

    /**
     * Handle window resize events
     * Updates camera aspect ratio and renderer size
     */
    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        // Update camera aspect ratio
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Clean up resources when scene is no longer needed
     * Disposes of geometries, materials, and renderer
     */
    dispose() {
        console.log('🧹 Disposing basic scene...');
        
        // Stop animation
        this.pause();
        
        // Dispose of renderer
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Dispose of scene objects
        if (this.scene) {
            this.scene.traverse((object) => {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }
        
        console.log('✅ Basic scene disposed');
    }
}
