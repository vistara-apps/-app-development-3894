function SkeletonLoader({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  variant = 'rectangular' 
}) {
  const baseClasses = 'skeleton skeleton-wave animate-pulse';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  const style = {
    width,
    height: variant === 'text' ? '1rem' : height
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-label="Loading content"
    />
  );
}

// Skeleton components for common patterns
export function SkeletonCard() {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonLoader variant="circular" width="3rem" height="3rem" />
        <div className="space-y-2 flex-1">
          <SkeletonLoader variant="text" width="60%" />
          <SkeletonLoader variant="text" width="40%" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="100%" />
        <SkeletonLoader variant="text" width="80%" />
        <SkeletonLoader variant="text" width="90%" />
      </div>
      <div className="flex justify-between items-center">
        <SkeletonLoader width="5rem" height="2rem" />
        <SkeletonLoader width="4rem" height="2rem" />
      </div>
    </div>
  );
}

export function SkeletonDebateCard() {
  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="text" width="80%" />
          <SkeletonLoader variant="text" width="60%" />
        </div>
        <SkeletonLoader width="4rem" height="1.5rem" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SkeletonLoader variant="circular" width="2rem" height="2rem" />
          <SkeletonLoader variant="text" width="6rem" />
        </div>
        <div className="flex space-x-2">
          <SkeletonLoader width="3rem" height="1.5rem" />
          <SkeletonLoader width="3rem" height="1.5rem" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonFeatureGrid() {
  return (
    <div className="features-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="feature-card p-8 space-y-4">
          <SkeletonLoader 
            variant="rectangular" 
            width="4rem" 
            height="4rem" 
            className="mx-auto"
          />
          <SkeletonLoader variant="text" width="70%" className="mx-auto" />
          <div className="space-y-2">
            <SkeletonLoader variant="text" width="100%" />
            <SkeletonLoader variant="text" width="90%" />
            <SkeletonLoader variant="text" width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;

