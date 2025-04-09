import { ReactNode, useState, useEffect } from 'react';
import { Suspense } from 'react';
import RetroLoader from '../animations/RetroLoader';

/**
 * Creates a resource that can be used with React Suspense
 * @param promise - The promise that will be resolved
 * @returns A resource object with read method
 */
export function createResource<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (e) => {
      status = 'error';
      error = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      } else {
        return result;
      }
    }
  };
}

/**
 * Component that wraps a data fetching component with Suspense and RetroLoader
 */
interface ResourceLoaderProps {
  resource: { read: () => any };
  children: (data: any) => ReactNode;
  fallback?: ReactNode;
  loaderProps?: {
    duration?: number;
    primaryText?: string;
    accentText?: string;
  };
}

export function ResourceLoader({
  resource,
  children,
  fallback,
  loaderProps = {}
}: ResourceLoaderProps) {
  const {
    duration = 2670,
    primaryText = "FETCHING DATA",
    accentText = "PLEASE WAIT..."
  } = loaderProps;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const defaultFallback = (
    <RetroLoader
      duration={duration}
      primaryText={primaryText}
      accentText={accentText}
      progress={progress}
    />
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children(resource.read())}
    </Suspense>
  );
}

/**
 * Example usage:
 * 
 * const userResource = createResource(fetchUserData(userId));
 * 
 * function UserProfile() {
 *   return (
 *     <ResourceLoader 
 *       resource={userResource}
 *       loaderProps={{ 
 *         primaryText: "LOADING PROFILE", 
 *         accentText: "RETRIEVING USER DATA..." 
 *       }}
 *     >
 *       {(userData) => (
 *         <div>
 *           <h1>{userData.name}</h1>
 *           <p>{userData.bio}</p>
 *         </div>
 *       )}
 *     </ResourceLoader>
 *   );
 * }
 */

export default ResourceLoader; 