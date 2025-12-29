import { useState, useEffect, useRef } from 'react';

interface TimelineNode {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: 'education' | 'work';
  description: string;
  skills: string[];
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleNodes, setVisibleNodes] = useState<number>(0);

  const nodes: TimelineNode[] = [
    {
      id: 'bsc-start',
      title: 'BSc Computer Science',
      organization: 'University of Huddersfield',
      period: '2019',
      type: 'education',
      description: 'Started Bachelor of Science in Computer Science with focus on software engineering, algorithms, and web technologies.',
      skills: ['Data Structures', 'Algorithms', 'Web Dev', 'Embedded Systems', 'AI']
    },
    {
      id: 'internship',
      title: 'Placement Year',
      organization: 'Axia Digital',
      period: '2021 - 2022',
      type: 'work',
      description: 'Developed web applications for professional development platforms. Gained hands-on experience with Web-development and client relations.',
      skills: ['React', 'JavaScript', 'Node.js', 'Git', 'Agile', 'REST APIs']
    },
    {
      id: 'graduated',
      title: 'Graduated',
      organization: 'BSc Computer Science',
      period: '2023',
      type: 'education',
      description: 'Graduated with the highest achievable grade (1:1) with the Mark Humphreys Memorial Prize for Outstanding Achievement.',
      skills: ['Mark Humphreys Prize', 'First Class (1:1)']
    },
    {
      id: 'developer',
      title: 'Software Developer',
      organization: 'Axia Digital',
      period: '2022 - Oct 2025',
      type: 'work',
      description: 'Led development of microservices using React/Node.js. Managed Azure cloud infrastructure and CI/CD pipelines.',
      skills: ['React', 'TypeScript', 'Flutter', 'Node.js', 'AWS', 'Azure', 'SQL', 'Docker', 'GitHub Actions']
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const { top } = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Ensure we are within the scrollable area of the container
      // The total scrollable distance is containerHeight - windowHeight (since the last screen is sticky)
      // Progress 0 when top is at 0 (or slightly before/after depending on sticky trigger)

      // We want progress 0 when container top hits viewport top (sticky starts)
      // We want progress 1 when container bottom hits viewport bottom (sticky ends)

      // Sticky starts when top <= 0
      const scrollDist = -top;
      const totalDist = containerHeight - windowHeight;

      let progress = scrollDist / totalDist;

      // Clamp
      progress = Math.max(0, Math.min(1, progress));

      // Calculate nodes to show. 
      // We have `nodes.length` steps.
      // progress 0 -> 0.25 : Node 1
      // progress 0.25 -> 0.5 : Node 2
      // etc.

      const step = 1 / nodes.length;
      const nodesIndex = Math.floor(progress / step) + 1;

      // Adjust to ensure we show 0 initially if just starting, but usually we want to see at least 1 if we are into the section?
      // User request: "Collapsed by default and then as we scroll, they should uncollapse".
      // Let's say initially 0. As we scroll, 1 appears, then 2...

      setVisibleNodes(Math.min(nodes.length, Math.max(0, nodesIndex)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [nodes.length]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${nodes.length * 60 + 100}vh` }}>
      {/* Container height determines scroll duration. 60vh per node. */}

      <div className="sticky top-20 bottom-23 h-[calc(100vh-5)] flex flex-col overflow-hidden">

        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4 text-center">The Journey</h2>
            <div className="h-1 w-24 bg-[var(--text-primary)]"></div>
          </div>

          <div className="relative">
            {/* Central Line - Always visible but maybe fades in? */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 hidden md:block transition-all duration-1000" style={{ height: `${visibleNodes * (100 / nodes.length)}%` }}></div>
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 md:hidden transition-all duration-1000" style={{ height: `${visibleNodes * (100 / nodes.length)}%` }}></div>

            <div className="space-y-12">
              {nodes.map((node, index) => {
                const isLeft = index % 2 === 0;
                const isVisible = index < visibleNodes;

                return (
                  <div
                    key={node.id}
                    className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''} items-center md:items-start w-full transition-all duration-700 ease-out`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                      filter: isVisible ? 'blur(0)' : 'blur(10px)',
                      pointerEvents: isVisible ? 'auto' : 'none'
                    }}
                  >

                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-[var(--bg-primary)] border-2 border-[var(--text-primary)] z-10 mt-1.5 transition-all duration-500"></div>

                    {/* Spacer for Desktop */}
                    <div className="hidden md:block w-1/2"></div>

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <div>
                        <span className="font-mono text-xs text-[var(--accent-cyan)] mb-2 block uppercase tracking-wider">
                          {node.period}
                        </span>
                        <h3 className="text-xl font-bold uppercase mb-1">{node.title}</h3>
                        <p className="font-mono text-sm text-gray-500 mb-4">{node.organization}</p>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-md ml-auto mr-auto md:mx-0">
                          {node.description}
                        </p>

                        <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                          {node.skills.map(skill => (
                            <span key={skill} className="text-xs font-mono border border-gray-200 dark:border-gray-800 px-2 py-1 bg-[var(--bg-primary)]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}