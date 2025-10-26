import { useEffect, useState } from "react";

export function FluidBackground() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newOffset = Math.sin(elapsed * 0.0006) * 80;
      setOffset(newOffset);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {/* Glowing Gradient Orbs */}
      <div
        className="absolute w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-3xl"
        style={{
          bottom: "0%",
          left: "0%",
          transform: `translateY(${offset}px)`,
        }}
      ></div>

      <div
        className="absolute w-[500px] h-[500px] bg-cyan-400/25 rounded-full blur-3xl"
        style={{
          top: "0%",
          right: "0%",
          transform: `translateY(${-offset}px)`,
        }}
      ></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-gridmove pointer-events-none"></div>
    </>
  );
}