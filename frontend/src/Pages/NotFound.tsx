import { useState, useEffect } from 'react';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    let animationFrame: number;
    const animateParticles = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: (p.x + p.vx + 100) % 100,
          y: (p.y + p.vy + 100) % 100,
        }))
      );
      animationFrame = requestAnimationFrame(animateParticles);
    };

    animationFrame = requestAnimationFrame(animateParticles);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          style={{
            top: '10%',
            left: '20%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        ></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Animated Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-sm"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0.6,
              animation: `pulse 3s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[140px] font-black leading-none mb-4">
            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 mt-8">
          Page Not Found
        </h2>
        <p className="text-slate-400 mb-12 max-w-md mx-auto">
          The page you're looking for has escaped to another dimension. Don't worry though, we can help you find your way home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105 font-semibold group"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </a>
          <a 
            href="/#projects" 
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-red-500/50 text-red-400 rounded-full hover:bg-red-500/10 hover:border-red-400 transition-all font-semibold group"
          >
            View Projects
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Fun Message */}
        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800/50">
          <p className="text-sm text-slate-400">
            💭 <span className="text-red-400">Fun fact:</span> In physics simulations, particles that can't find their destination often create the most interesting emergent behaviors.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}