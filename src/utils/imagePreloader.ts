// List of critical images that should be preloaded immediately
export const CRITICAL_IMAGES = [
    '/src/assets/hauger4_optimized.png',
    '/src/assets/SoundRoom2_optimized.png',
    '/src/assets/output.png' // Add your critical images here
];

// Global cache for preloaded images
export const imageCache = new Map<string, HTMLImageElement>();

/**
 * Preloads a single image and returns a promise
 */
const preloadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        // Check if image is already cached
        if (imageCache.has(src)) {
            resolve(imageCache.get(src)!);
            return;
        }

        const img = new Image();
        
        img.onload = () => {
            imageCache.set(src, img);
            resolve(img);
        };
        
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        
        img.src = src;
    });
};

/**
 * Preloads multiple images and tracks overall progress
 */
export const preloadImages = async (
    images: string[],
    onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> => {
    let loaded = 0;
    const successfullyLoaded: HTMLImageElement[] = [];
    
    const updateProgress = () => {
        loaded++;
        if (onProgress) {
            onProgress((loaded / images.length) * 100);
        }
    };

    await Promise.all(
        images.map(async (src) => {
            try {
                const img = await preloadImage(src);
                successfullyLoaded.push(img);
                updateProgress();
            } catch (error) {
                console.error(error);
                updateProgress();
            }
        })
    );

    return successfullyLoaded;
};

/**
 * Starts preloading critical images immediately
 */
export const initializeCriticalImagePreload = (): Promise<void> => {
    return preloadImages(CRITICAL_IMAGES)
        .then(() => console.log('Critical images preloaded'))
        .catch(error => console.error('Error preloading critical images:', error));
}; 