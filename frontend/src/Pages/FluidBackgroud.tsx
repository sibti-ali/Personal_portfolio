import { useEffect, useState } from "react";

export function FluidBackground({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

  // Smoothly interpolate between current and target mouse position
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.08,
        y: prev.y + (mousePosition.y - prev.y) * 0.08,
      }));
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  return (
    <>
      {/* Glowing Gradient Orbs */}
      <div
        className="absolute w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-3xl transition-transform duration-200"
        style={{
          top: "15%",
          left: "20%",
          transform: `translate(${smoothPos.x * 0.5}px, ${smoothPos.y * 0.5}px)`,
        }}
      ></div>

      <div
        className="absolute w-[550px] h-[550px] bg-purple-500/25 rounded-full blur-3xl transition-transform duration-200"
        style={{
          bottom: "20%",
          right: "15%",
          transform: `translate(${smoothPos.x * -0.5}px, ${smoothPos.y * -0.5}px)`,
        }}
      ></div>

      <div
        className="absolute w-[500px] h-[500px] bg-cyan-400/25 rounded-full blur-3xl transition-transform duration-200"
        style={{
          top: "50%",
          left: "45%",
          transform: `translate(${smoothPos.x * 0.5}px, ${smoothPos.y * 0.5}px)`,
        }}
      ></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-gridmove"></div>
    </>
  );
}
