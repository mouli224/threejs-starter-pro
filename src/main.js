import * as THREE from 'three';
import { BasicScene } from './scenes/BasicScene.js';
import { EnhancedScene } from './scenes/EnhancedScene.js';

class App {
    constructor() {
        this.basicScene = null;
        this.enhancedScene = null;
        this.currentView = 'basic';
        
        this.init();
        this.bindEvents();
    }

    init() {
        // Initialize basic scene
        this.basicScene = new BasicScene();
        this.basicScene.init('basic-scene');

        console.log('Three.js Starter Pro loaded successfully!');
    }

    bindEvents() {
        // Enhanced view button
        const enhancedBtn = document.getElementById('enhanced-btn');
        enhancedBtn.addEventListener('click', () => {
            this.showEnhancedView();
        });

        // Back button
        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
            this.showBasicView();
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            if (this.currentView === 'basic' && this.basicScene) {
                this.basicScene.onWindowResize();
            } else if (this.currentView === 'enhanced' && this.enhancedScene) {
                this.enhancedScene.onWindowResize();
            }
        });
    }

    showEnhancedView() {
        // Hide basic view
        document.getElementById('basic-view').classList.remove('active');
        
        // Show enhanced view
        document.getElementById('enhanced-view').classList.add('active');
        
        // Initialize enhanced scene if not already done
        if (!this.enhancedScene) {
            this.enhancedScene = new EnhancedScene();
            this.enhancedScene.init('enhanced-scene');
        }
        
        // Pause basic scene and start enhanced scene
        if (this.basicScene) {
            this.basicScene.pause();
        }
        if (this.enhancedScene) {
            this.enhancedScene.resume();
        }
        
        this.currentView = 'enhanced';
    }

    showBasicView() {
        // Hide enhanced view
        document.getElementById('enhanced-view').classList.remove('active');
        
        // Show basic view
        document.getElementById('basic-view').classList.add('active');
        
        // Pause enhanced scene and resume basic scene
        if (this.enhancedScene) {
            this.enhancedScene.pause();
        }
        if (this.basicScene) {
            this.basicScene.resume();
        }
        
        this.currentView = 'basic';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
