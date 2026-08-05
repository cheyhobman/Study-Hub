/* ============================================================================
   speed-insights.js: Vercel Speed Insights integration for tracking Web Vitals
   ========================================================================== */

/**
 * Initializes Vercel Speed Insights tracking.
 * This will only track metrics when deployed on Vercel.
 * In development mode, no data is collected.
 */
export async function initSpeedInsights() {
  try {
    // Import the inject function from @vercel/speed-insights via CDN
    const { inject } = await import('https://cdn.jsdelivr.net/npm/@vercel/speed-insights@2.0.0/dist/index.js');
    
    // Initialize Speed Insights tracking
    inject();
    
    console.log('Vercel Speed Insights initialized');
  } catch (error) {
    // Silently fail in case the CDN is unreachable or in development
    console.debug('Speed Insights not loaded:', error.message);
  }
}
