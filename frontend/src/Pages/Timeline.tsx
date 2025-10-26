import { useState } from 'react';

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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [clickedNode, setClickedNode] = useState<string | null>(null);

  const nodes: TimelineNode[] = [
    {
      id: 'bsc-start',
      title: 'Started my bachelor`s in Computer Science',
      organization: 'University of Huddersfield',
      period: '2019',
      type: 'education',
      description: 'Started Bachelor of Science in Computer Science with focus on software engineering, algorithms, and web technologies.',
      skills: ['Data Structures & Algorithms', 'Databases', 'Web Development', 'Embedded Systems', 'AI']
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
      description: 'Graduated with the highest achievable grade (1:1) with the Mark Humphry\'s Memorial Prize for Outstanding Achievement During Placement Year.',
      skills: ['Mark Humphry\'s Memorial Prize', 'First(1:1)']
    },
    {
      id: 'developer',
      title: 'Software Developer',
      organization: 'Axia Digital',
      period: '2022 - Present',
      type: 'work',
      description: 'Building enterprise-grade CPD platforms for professionals. Leading development of multiple projects with experience in cloud technologies.',
      skills: ['React', 'TypeScript', 'Flutter', 'Node.js', 'AWS', 'MongoDB', 'Docker']
    }
  ];

  const getNodePosition = (index: number) => {
    return index * 150 + 30;
  };

  const borderColor = (node: TimelineNode) => {
    const isExpanded = hoveredNode === node.id || clickedNode === node.id;
    return isExpanded
      ? (node.type === 'education' ? 'border-purple-500' : 'border-cyan-500')
      : 'border-slate-700';
  };

  const isNodeExpanded = (nodeId: string) => {
    if (clickedNode) return clickedNode === nodeId;
    return hoveredNode === nodeId;
  };

  const handleCardClick = (nodeId: string) => {
    setHoveredNode(null);
    setClickedNode(clickedNode === nodeId ? null : nodeId);
  };


  return (
    <div className="w-full max-w-6xl mx-auto px-4 ">
      <h2 className="text-4xl font-bold text-center mb-4">
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Journey
        </span>
      </h2>
      <p className="text-center text-slate-400 mb-16">
        My education and professional experience
      </p>

      <div className="relative" style={{ minHeight: `${nodes.length * 150 + 100}px` }}>
        
        {/* Connecting line - Desktop at 50%, Mobile at 20px from left */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {/* Desktop line */}
          <line 
            className="hidden md:block"
            x1="50%" 
            y1={getNodePosition(0) + 20} 
            x2="50%" 
            y2={getNodePosition(nodes.length - 1) + 20} 
            stroke="#64748b" 
            strokeWidth="4" 
          />
          {/* Mobile line */}
          <line 
            className="md:hidden"
            x1="20" 
            y1={getNodePosition(0) + 20} 
            x2="20" 
            y2={getNodePosition(nodes.length - 1) + 20} 
            stroke="#64748b" 
            strokeWidth="4" 
          />
        </svg>

        {/* Timeline items */}
        <div className="relative" style={{ zIndex: 2 }}>
          {nodes.map((node, index) => {
            const topPosition = getNodePosition(index);
            const isLeft = node.type !== 'work';

            return (
              <div key={node.id}>
                {/* Card - Desktop (alternating sides) */}
                <div 
                  className="hidden md:block absolute"
                  style={{
                    top: `${topPosition}px`,
                    left: isLeft ? '50%' : 'auto',
                    right: isLeft ? 'auto' : '50%',
                    marginLeft: isLeft ? '24px' : 'auto',
                    marginRight: isLeft ? 'auto' : '24px',
                    zIndex: isNodeExpanded(node.id) ? 10 : 2
                  }}
                >
                  <div 
                    className={`w-80 bg-slate-900 border rounded-lg p-4 transition-all cursor-pointer ${borderColor(node)}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleCardClick(node.id)}
                  >
                    <h3 className="text-white font-medium mb-1">{node.title}</h3>
                    <p className="text-slate-400 text-sm mb-0.5">{node.organization}</p>
                    <p className="text-slate-500 text-xs">{node.period}</p>
                    
                    {isNodeExpanded(node.id) && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <p className="text-slate-300 text-sm mb-2">{node.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {node.skills.map(skill => (
                            <span key={skill} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card - Mobile (all on right side) */}
                <div 
                  className="md:hidden absolute"
                  style={{
                    top: `${topPosition}px`,
                    left: '44px',
                    right: '0',
                    zIndex: isNodeExpanded(node.id) ? 10 : 2
                  }}
                >
                  <div 
                    className={`bg-slate-900 border rounded-lg p-4 transition-all cursor-pointer ${borderColor(node)}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleCardClick(node.id)}
                  >
                    <h3 className="text-white font-medium mb-1">{node.title}</h3>
                    <p className="text-slate-400 text-sm mb-0.5">{node.organization}</p>
                    <p className="text-slate-500 text-xs">{node.period}</p>
                    
                    {isNodeExpanded(node.id) && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <p className="text-slate-300 text-sm mb-2">{node.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {node.skills.map(skill => (
                            <span key={skill} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Node dot - Desktop at center, Mobile at left */}
                <div 
                  className="absolute"
                  style={{
                    top: `${topPosition + 20}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3
                  }}
                >
                  <div className="hidden md:block w-4 h-4 rounded-full bg-slate-600" />
                </div>
                <div 
                  className="absolute md:hidden"
                  style={{
                    top: `${topPosition + 20}px`,
                    left: '12px',
                    zIndex: 3
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-slate-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}