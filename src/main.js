import * as THREE from 'three';
import { BasicScene } from './scenes/BasicScene.js';
import { EnhancedScene } from './scenes/EnhancedScene.js';

/**
 * Main Application Class
 * Manages the Three.js application with two viewing modes:
 * - Basic: Simple rotating cube
 * - Enhanced: Interactive cube with orbit controls and customization options
 */
class App {
    constructor() {
        // Scene instances
        this.basicScene = null;
        this.enhancedScene = null;
        
        // Current view state
        this.currentView = 'basic';
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the application
     * Sets up the basic scene and binds all event listeners
     */
    init() {
        console.log('🚀 Initializing Three.js Starter Pro...');
        
        // Initialize basic scene first (default view)
        this.initializeBasicScene();
        
        // Set up all event listeners
        this.bindEvents();
        
        console.log('✅ Three.js Starter Pro loaded successfully!');
    }

    /**
     * Initialize the basic scene
     * Creates and starts the simple rotating cube scene
     */
    initializeBasicScene() {
        try {
            this.basicScene = new BasicScene();
            this.basicScene.init('basic-scene');
            console.log('📦 Basic scene initialized');
        } catch (error) {
            console.error('❌ Failed to initialize basic scene:', error);
        }
    }

    /**
     * Initialize the enhanced scene (lazy loading)
     * Creates the advanced interactive scene with orbit controls
     */
    initializeEnhancedScene() {
        try {
            if (!this.enhancedScene) {
                this.enhancedScene = new EnhancedScene();
                this.enhancedScene.init('enhanced-scene');
                console.log('✨ Enhanced scene initialized');
            }
        } catch (error) {
            console.error('❌ Failed to initialize enhanced scene:', error);
        }
    }

    /**
     * Bind all event listeners
     * Sets up click handlers and window resize events
     */
    bindEvents() {
        // Enhanced view navigation
        this.bindEnhancedViewButton();
        
        // Basic view navigation
        this.bindBackButton();
        
        // Window resize handling
        this.bindWindowResize();
    }

    /**
     * Bind enhanced view button click event
     */
    bindEnhancedViewButton() {
        const enhancedBtn = document.getElementById('enhanced-btn');
        if (enhancedBtn) {
            enhancedBtn.addEventListener('click', () => {
                console.log('🔄 Switching to enhanced view');
                this.showEnhancedView();
            });
        } else {
            console.warn('⚠️ Enhanced button not found');
        }
    }

    /**
     * Bind back button click event
     */
    bindBackButton() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                console.log('🔄 Switching to basic view');
                this.showBasicView();
            });
        } else {
            console.warn('⚠️ Back button not found');
        }
    }

    /**
     * Bind window resize event
     * Ensures proper rendering when window size changes
     */
    bindWindowResize() {
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
    }

    /**
     * Handle window resize events
     * Calls the appropriate scene's resize handler based on current view
     */
    handleWindowResize() {
        try {
            if (this.currentView === 'basic' && this.basicScene) {
                this.basicScene.onWindowResize();
            } else if (this.currentView === 'enhanced' && this.enhancedScene) {
                this.enhancedScene.onWindowResize();
            }
        } catch (error) {
            console.error('❌ Error handling window resize:', error);
        }
    }

    /**
     * Switch to enhanced view
     * Hides basic view, shows enhanced view, and manages scene states
     */
    showEnhancedView() {
        try {
            // Update UI visibility
            this.hideBasicView();
            this.showEnhancedViewUI();
            
            // Initialize enhanced scene if needed
            this.initializeEnhancedScene();
            
            // Manage scene states
            this.pauseBasicScene();
            this.resumeEnhancedScene();
            
            // Update current view state
            this.currentView = 'enhanced';
            
            console.log('✅ Enhanced view activated');
        } catch (error) {
            console.error('❌ Error switching to enhanced view:', error);
        }
    }

    /**
     * Switch to basic view
     * Hides enhanced view, shows basic view, and manages scene states
     */
    showBasicView() {
        try {
            // Update UI visibility
            this.hideEnhancedView();
            this.showBasicViewUI();
            
            // Manage scene states
            this.pauseEnhancedScene();
            this.resumeBasicScene();
            
            // Update current view state
            this.currentView = 'basic';
            
            console.log('✅ Basic view activated');
        } catch (error) {
            console.error('❌ Error switching to basic view:', error);
        }
    }

    /**
     * Hide basic view UI
     */
    hideBasicView() {
        const basicView = document.getElementById('basic-view');
        if (basicView) {
            basicView.classList.remove('active');
        }
    }

    /**
     * Show enhanced view UI
     */
    showEnhancedViewUI() {
        const enhancedView = document.getElementById('enhanced-view');
        if (enhancedView) {
            enhancedView.classList.add('active');
        }
    }

    /**
     * Hide enhanced view UI
     */
    hideEnhancedView() {
        const enhancedView = document.getElementById('enhanced-view');
        if (enhancedView) {
            enhancedView.classList.remove('active');
        }
    }

    /**
     * Show basic view UI
     */
    showBasicViewUI() {
        const basicView = document.getElementById('basic-view');
        if (basicView) {
            basicView.classList.add('active');
        }
    }

    /**
     * Pause basic scene animation
     */
    pauseBasicScene() {
        if (this.basicScene) {
            this.basicScene.pause();
        }
    }

    /**
     * Resume basic scene animation
     */
    resumeBasicScene() {
        if (this.basicScene) {
            this.basicScene.resume();
        }
    }

    /**
     * Pause enhanced scene animation
     */
    pauseEnhancedScene() {
        if (this.enhancedScene) {
            this.enhancedScene.pause();
        }
    }

    /**
     * Resume enhanced scene animation
     */
    resumeEnhancedScene() {
        if (this.enhancedScene) {
            this.enhancedScene.resume();
        }
    }

    /**
     * Cleanup method for proper disposal
     * Should be called when the application is being destroyed
     */
    dispose() {
        console.log('🧹 Cleaning up application...');
        
        try {
            // Dispose of scenes
            if (this.basicScene) {
                this.basicScene.dispose();
                this.basicScene = null;
            }
            
            if (this.enhancedScene) {
                this.enhancedScene.dispose();
                this.enhancedScene = null;
            }
            
            // Remove event listeners
            window.removeEventListener('resize', this.handleWindowResize);
            
            console.log('✅ Application cleanup completed');
        } catch (error) {
            console.error('❌ Error during cleanup:', error);
        }
    }
}

/**
 * Application Entry Point
 * Initialize the app when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 DOM loaded, starting Three.js Starter Pro...');
    
    // Create global app instance
    window.threejsApp = new App();
    
    // Optional: Add cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (window.threejsApp) {
            window.threejsApp.dispose();
        }
    });
});
