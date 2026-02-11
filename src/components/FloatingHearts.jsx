import { useMemo } from 'react';
import './FloatingHearts.css';

export default function FloatingHearts({ count = 8 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10,
      size: 4 + Math.random() * 8,
      opacity: 0.06 + Math.random() * 0.12,
    }));
  }, [count]);

  return (
    <div className="floating-petals" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  );
}
