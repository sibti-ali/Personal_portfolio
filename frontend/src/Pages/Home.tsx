import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import Timeline from './Timeline';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'tools'>('frontend');
  const [projectIndex, setProjectIndex] = useState(0);

  const projects = [
    {
      title: 'Fluid Simulations',
      images: ['fluid_simulations.png'],
      description: 'Real-time 2D fluid simulator with parallelization using C++, OpenGL, and OpenMPI.',
      tags: ['C++', 'OpenGL', 'OpenMPI', 'Parallel Computing'],
      link: 'NA',
      accent: 'border-blue-500'
    },
    {
      title: 'HTTP server from scratch',
      images: ['HTTP_GO.png'],
      description: 'Building my own HTTP server from scratch. Parsing HTTP messages from data streaming and implemented chunked encoding',
      tags: ['Go / GoLang', 'RFC 9110', 'HTTP', 'State Machines', 'Byte parsing', 'Chunked Encoding'],
      link: 'https://github.com/sibti-ali/HTTP-server-from-scratch',
      accent: 'border-cyan-500'
    },
    {
      title: 'E-Assessment Platforms',
      images: ['UHCW_HOME.png', 'UHCW_AC.png'],
      description: 'Designed and developed WebApps. Integrated RBA allowing trainees in professional practice to validate their work.',
      tags: ['jQuery', 'Bootstrap', 'XSLT', 'XML', 'C# .NET', 'AWS'],
      link: 'NA',
      accent: 'border-pink-500'
    },
    {
      title: 'Mobile App',
      images: ['MicroSkills.png'],
      description: 'Designed, Developed and Deployed a mobile app in use by Partners of the NHS England.',
      tags: ['Flutter', 'WebViews', 'Provider', 'Encrypted Storage', 'MVC', 'XCode', 'Android Studio'],
      link: 'NA',
      accent: 'border-purple-500'
    },
    {
      title: 'Task Manager',
      images: ['TaskManager.gif', 'TaskManager_create.png', 'TaskManager_home.png'],
      description: 'Comprehensive task management system for caseworkers featuring an interactive kanban board with real-time updates.',
      tags: ['React', 'Express.js', 'SQL', 'Axios', 'Docs', 'Unit Testing', 'Kanban Board', 'Real-time Updates'],
      link: 'https://github.com/sibti-ali/TaskManager',
      accent: 'border-green-500'
    }
    
  ];

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'journey', 'skills', 'projects'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const skills: Record<'frontend' | 'backend' | 'tools', string[]> = {
    frontend: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'Dart', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'Go', 'SQL', 'Python', 'C#/C++', 'OpenMPI'],
    tools: ['Git', 'VS Code', 'Postman', 'AWS', 'Azure DevOps', 'Docker', 'Linux']
  };

  const visibleProjects = projects.slice(
    projectIndex * projectsPerPage,
    (projectIndex + 1) * projectsPerPage
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[var(--bg-primary)]/90 backdrop-blur-sm z-40 border-b border-[var(--text-primary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <a onClick={() => scrollToSection('home')} className="text-2xl font-bold font-mono tracking-tighter cursor-pointer hover:opacity-70 transition-opacity">
              &lt;SA/&gt;
            </a>

            <div className="hidden md:flex items-center space-x-10">
              {['home', 'journey', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`uppercase text-sm tracking-widest hover:line-through decoration-2 ${activeSection === section ? 'font-bold line-through decoration-[var(--accent-cyan)]' : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                  {section}
                </button>
              ))}
              <div className="pl-4 border-l border-gray-300 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>

            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--text-primary)]">
            <div className="px-6 py-6 space-y-4">
              {['home', 'journey', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 uppercase tracking-widest text-sm hover:translate-x-2 transition-transform"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 mt-2">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-xs font-mono mb-6 bg-[var(--accent-cyan)]/5">
              AVAILABLE FOR WORK
            </div>
            <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tighter leading-none">
              SIBTAIN <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-purple)]">ALI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Software Developer specializing in enterprise solutions, data-driven platforms, and digital experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/Sibtain_Ali.pdf"
                download="Sibtain_Ali_Resume.pdf"
                className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold hover:bg-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] border border-[var(--text-primary)] transition-all flex items-center gap-2 group"
              >
                DOWNLOAD RESUME
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-[var(--text-primary)] hover:border-[var(--accent-pink)] hover:text-[var(--accent-pink)] transition-all font-bold"
              >
                CONTACT
              </a>
            </div>

            <div className="mb-6 flex gap-6 mt-12">
              <a href="https://github.com/sibti-ali/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[var(--accent-cyan)] transition-colors transform hover:-translate-y-1"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/sibtain-ali-73ab7a213/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[var(--accent-cyan)] transition-colors transform hover:-translate-y-1"><Linkedin size={24} /></a>
              <a href="mailto:jsibtainali@gmail.com" className="text-gray-500 hover:text-[var(--accent-cyan)] transition-colors transform hover:-translate-y-1"><Mail size={24} /></a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              <div className="w-64 h-64 sm:w-80 sm:h-80 transition-all duration-700 ease-in-out border-2 border-[var(--text-primary)] group-hover:border-[var(--accent-cyan)] p-2 bg-[var(--bg-primary)]">
                <img src="/me.jpg" className="w-full h-full object-cover" alt="Profile" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--text-primary)] group-hover:border-[var(--accent-purple)] transition-colors duration-500 -z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="journey" className=" flex py-24 px-6 border-t border-[var(--text-primary)]">
        <div className="w-full">
          <Timeline />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-t border-[var(--text-primary)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">Technical<br />Arsenal</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                A curated list of technologies I use to build performant and scalable applications.
              </p>
            </div>

            <div className="md:w-2/3">
              <div className="flex gap-8 mb-8 border-b-2 border-gray-200 dark:border-gray-800 pb-4">
                {(['frontend', 'backend', 'tools'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`uppercase font-bold tracking-wider text-sm ${activeTab === tab ? 'text-[var(--text-primary)]' : 'text-gray-400'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills[activeTab].map((skill) => (
                  <div key={skill} className="p-4 border border-gray-200 dark:border-gray-800 hover:border-[var(--text-primary)] transition-colors group cursor-default">
                    <span className="font-mono text-sm group-hover:text-[var(--accent-cyan)] transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-[var(--text-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight">Selected<br />Works</h2>
            <div className="flex gap-2">
              <button onClick={() => setProjectIndex(Math.max(0, projectIndex - 1))} disabled={projectIndex === 0} className="p-3 border border-[var(--text-primary)] disabled:opacity-30 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"><ChevronLeft size={20} /></button>
              <button onClick={() => setProjectIndex(Math.min(totalPages - 1, projectIndex + 1))} disabled={projectIndex === totalPages - 1} className="p-3 border border-[var(--text-primary)] disabled:opacity-30 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <div key={index} className="group border border-gray-200 dark:border-gray-800 hover:border-[var(--text-primary)] transition-all h-full flex flex-col">
                <div className="h-48 overflow-hidden border-b border-gray-200 dark:border-gray-800 relative bg-gray-100 dark:bg-gray-900">
                  {project.images.length > 0 ? (
                    <img
                      src={`/${project.images[0]}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900 text-gray-300">
                      <Terminal size={48} strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-xs font-mono border border-gray-200 dark:border-gray-800 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && <span className="text-xs font-mono px-2 py-1">+{project.tags.length - 4}</span>}
                  </div>

                  {project.link !== 'NA' ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all">
                      VIEW SOURCE <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-gray-400 cursor-not-allowed">
                      PRIVATE PROJECT
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-6 border-t border-[var(--text-primary)] bg-[var(--bg-primary)] text-center">
        <a
          href="mailto:jsibtainali@gmail.com"
          className="inline-block text-lg font-bold hover:text-[var(--accent-cyan)] transition-colors mb-6"
        >
          jsibtainali@gmail.com
        </a>

        <div className="flex justify-center gap-6 mb-8">
          <a href="https://github.com/sibti-ali/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors"><Github size={20} /></a>
          <a href="https://www.linkedin.com/in/sibtain-ali-73ab7a213/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors"><Linkedin size={20} /></a>
        </div>

        <p className="text-xs font-mono text-gray-400">© {new Date().getFullYear()} SIBTAIN ALI</p>
      </footer>
    </div>
  );
}