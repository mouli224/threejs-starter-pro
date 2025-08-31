import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class EnhancedScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.controls = null;
        this.animationId = null;
        this.isAnimating = false;
        this.rotationSpeed = 0.01;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
    }

    init(containerId) {
        const container = document.getElementById(containerId);
        
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x060610);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 6;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        container.appendChild(this.renderer.domElement);

        // Create enhanced cube
        this.createEnhancedCube();

        // Add enhanced lights
        this.addEnhancedLights();

        // Add floating particles
        this.addParticles();

        // Add orbit controls
        this.addOrbitControls();

        // Bind controls
        this.bindControls();

        // Add mouse interaction
        this.addMouseInteraction();

        // Start animation
        this.isAnimating = true;
        this.animate();
    }

    createEnhancedCube() {
        const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        
        // Create gradient material
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            metalness: 0.3,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.9,
            envMapIntensity: 1.0
        });
        
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.scene.add(this.cube);

        // Add wireframe overlay
        const wireframeGeometry = new THREE.EdgesGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.3 
        });
        this.wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        this.cube.add(this.wireframe);
    }

    addEnhancedLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Multiple colored point lights
        const colors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x10b981, 0x64748b];
        this.lights = [];

        colors.forEach((color, index) => {
            const light = new THREE.PointLight(color, 0.8, 50);
            const angle = (index / colors.length) * Math.PI * 2;
            light.position.x = Math.cos(angle) * 8;
            light.position.y = Math.sin(angle) * 8;
            light.position.z = 5;
            light.castShadow = true;
            this.scene.add(light);
            this.lights.push(light);
        });

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
    }

    addParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            colors[i * 3] = Math.random();
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    addOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        // Configure controls
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
        
        // Set limits
        this.controls.maxDistance = 20;
        this.controls.minDistance = 2;
        this.controls.maxPolarAngle = Math.PI;
        
        // Set initial target
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    bindControls() {
        // Rotation speed control
        const rotationSpeedControl = document.getElementById('rotation-speed');
        rotationSpeedControl.addEventListener('input', (e) => {
            this.rotationSpeed = parseFloat(e.target.value);
        });

        // Color control
        const colorControl = document.getElementById('cube-color');
        colorControl.addEventListener('input', (e) => {
            const color = new THREE.Color(e.target.value);
            this.cube.material.color = color;
        });

        // Wireframe control
        const wireframeControl = document.getElementById('wireframe');
        wireframeControl.addEventListener('change', (e) => {
            this.wireframe.visible = e.target.checked;
        });

        // Scale control
        const scaleControl = document.getElementById('scale');
        scaleControl.addEventListener('input', (e) => {
            const scale = parseFloat(e.target.value);
            this.cube.scale.set(scale, scale, scale);
        });
    }

    addMouseInteraction() {
        const container = this.renderer.domElement;
        
        container.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            this.targetRotationX = this.mouseY * 0.5;
            this.targetRotationY = this.mouseX * 0.5;
        });

        container.addEventListener('click', () => {
            // Add a pulse effect on click
            const originalScale = this.cube.scale.x;
            this.cube.scale.set(originalScale * 1.2, originalScale * 1.2, originalScale * 1.2);
            
            setTimeout(() => {
                this.cube.scale.set(originalScale, originalScale, originalScale);
            }, 200);
        });
    }

    animate() {
        if (!this.isAnimating) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        // Rotate cube with user-controlled speed
        if (this.cube) {
            this.cube.rotation.x += this.rotationSpeed;
            this.cube.rotation.y += this.rotationSpeed;
            
            // Add subtle floating motion
            this.cube.position.y = Math.sin(time * 0.5) * 0.3;
            
            // Smooth mouse interaction (only when not using orbit controls)
            if (!this.controls.enabled) {
                this.cube.rotation.x += (this.targetRotationX - this.cube.rotation.x) * 0.05;
                this.cube.rotation.y += (this.targetRotationY - this.cube.rotation.y) * 0.05;
            }
        }

        // Animate lights
        if (this.lights) {
            this.lights.forEach((light, index) => {
                const angle = time * 0.5 + (index / this.lights.length) * Math.PI * 2;
                light.position.x = Math.cos(angle) * 8;
                light.position.y = Math.sin(angle) * 8;
                light.intensity = 0.8 + Math.sin(time * 2 + index) * 0.3;
            });
        }

        // Animate particles
        if (this.particles) {
            this.particles.rotation.x += 0.002;
            this.particles.rotation.y += 0.002;
        }

        this.renderer.render(this.scene, this.camera);
    }

    pause() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resume() {
        this.isAnimating = true;
        this.animate();
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (this.controls) {
            this.controls.update();
        }
    }

    dispose() {
        this.pause();
        
        if (this.controls) {
            this.controls.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
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
    }
}
