/**
 * Utility function to build class names conditionally
 * Filters out falsy values (false, null, undefined, 0, '')
 * and joins the remaining values with a space
 */
export const cx = (...classes: (string | false | null | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Utility function that conditionally adds a class
 * Only adds the class if the condition is truthy
 */
export const conditionalClass = (condition: any, className: string): string => {
  return condition ? className : '';
};

/**
 * Utility function that builds a className string from a base class
 * and conditionally adds additional classes based on a map of conditions
 */
export const buildClassName = (
  baseClass: string, 
  conditionalClasses: Record<string, boolean>
): string => {
  const classes = [baseClass];
  
  Object.entries(conditionalClasses).forEach(([className, condition]) => {
    if (condition) {
      classes.push(className);
    }
  });
  
  return classes.join(' ');
};

/**
 * Utility function that creates a scoped className builder
 * Useful for components with many conditional classes
 */
export const createClassBuilder = (namespace: string) => {
  return (element: string, modifiers: Record<string, boolean> = {}) => {
    const baseClass = `${namespace}__${element}`;
    const classes = [baseClass];
    
    Object.entries(modifiers).forEach(([modifier, active]) => {
      if (active) {
        classes.push(`${baseClass}--${modifier}`);
      }
    });
    
    return classes.join(' ');
  };
}; 