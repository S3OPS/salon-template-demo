/**
 * Your Salon Name — Main JavaScript Entry Point
 * Optimized and modularized for better performance and maintainability
 */

import { utils } from './utils.js';
import { lazyLoading } from './lazy-loading.js';
import { formValidation } from './form-validation.js';
import { lightbox } from './lightbox.js';
import { analytics } from './analytics.js';
import { smoothScroll } from './smooth-scroll.js';
import { mobileCTA } from './mobile-cta.js';
import { performance } from './performance.js';
import { config } from './config.js';

/**
 * Application initialization
 */
class App {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize a module with error boundary
   * @param {Object} module - Module to initialize
   * @param {string} name - Module name for logging
   */
  initModule(module, name) {
    try {
      module.init();
      if (config.isDevelopment()) {
        console.log(`✅ ${name} initialized`);
      }
    } catch (error) {
      console.error(`❌ ${name} failed to initialize:`, error);
      // Continue with other modules - graceful degradation
    }
  }

  /**
   * Initialize all application modules
   */
  init() {
    if (this.initialized) return;

    // Check WebP support (wrapped in try-catch)
    try {
      utils.checkWebPSupport((isSupported) => {
        document.documentElement.classList.add(isSupported ? 'webp' : 'no-webp');
      });
    } catch (error) {
      console.error('WebP detection failed:', error);
      // Fallback: assume no WebP support
      document.documentElement.classList.add('no-webp');
    }

    // Initialize all modules with error boundaries
    this.initModule(lazyLoading, 'Lazy Loading');
    this.initModule(formValidation, 'Form Validation');
    this.initModule(lightbox, 'Lightbox');
    this.initModule(smoothScroll, 'Smooth Scroll');
    this.initModule(mobileCTA, 'Mobile CTA');
    this.initModule(analytics, 'Analytics');
    this.initModule(performance, 'Performance Monitoring');

    this.initialized = true;
    
    // Only log in development
    if (config.isDevelopment()) {
      console.log('✨ Your Salon Name — Site initialized');
    }
  }
}

// Initialize app when DOM is ready
const app = new App();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
