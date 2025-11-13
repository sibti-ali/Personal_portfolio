import { useState, useEffect } from 'react';
import { Github, Linkedin, Lock, Mail, ExternalLink, Menu, X, ChevronLeft, ChevronRight, Download, Image } from 'lucide-react';
import Timeline from './Timeline';
import { FluidBackground } from './FluidBackgroud';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'tools'>('frontend');
  const [projectIndex, setProjectIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
     {
      title: 'HTTP server from scratch',
      images: ['HTTP_GO.png'],
      description: 'Building my own HTTP server from scratch. Parsing HTTP messages from data streaming and implemented chunked encoding',
      tags: ['Go / GoLang', 'RFC 9110', 'HTTP', 'State Machines', 'Byte parsing', 'Chunked Encoding'],
      link: 'https://github.com/sibti-ali/HTTP-server-from-scratch',
      gradient: 'from-purple-600 via-pink-500 to-rose-400'
    },
    {
      title: 'E-Assessment Platforms for Axia Digital',
      images: ['UHCW_HOME.png', 'UHCW_AC.png'],
      description: 'Designed and developed WebApps. Integrated RBA allowing trainees in professional practice to validate their work.',
      tags: ['jQuery','Bootstrap' ,'XSLT', 'XML', 'C# .NET','AWS'],
      link: 'NA',
      gradient: 'from-purple-600 via-pink-500 to-rose-400'
    },
    {
      title: 'Mobile App for Axia Digital',
      images: ['MicroSkills.png'],
      description: 'Designed, Developed and Deployed a mobile app in use by Partners of the NHS England.',
      tags: ['Flutter', 'WebViews', 'Provider', 'Encrypted Storage', 'MVC', 'XCode', 'Android Studio'],
      link: 'NA',
      gradient: 'from-purple-600 via-pink-500 to-rose-400'
    },
    {
      title: 'Task Manager Application',
      images: ['TaskManager.gif','TaskManager_create.png', 'TaskManager_home.png'],
      description: 'Comprehensive task management system for caseworkers featuring an interactive kanban board with real-time updates.',
      tags: ['React', 'Express.js', 'SQL', 'Axios','Docs', 'Unit Testing','Kanban Board', 'Real-time Updates'],
      link: 'https://github.com/sibti-ali/TaskManager',
      gradient: 'from-purple-600 via-pink-500 to-rose-400'
    },
   
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const goToPrevious = () => {
    setProjectIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setProjectIndex((prev) => (prev + 1) % totalPages);
  };

  const openGallery = (projectIdx: number) => {
    setGalleryOpen(projectIdx);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setGalleryOpen(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (galleryOpen !== null) {
      const project = visibleProjects[galleryOpen];
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (galleryOpen !== null) {
      const project = visibleProjects[galleryOpen];
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const skills: Record<'frontend' | 'backend' | 'tools', string[]> = {
    frontend: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'XSLT/XML', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'REST APIs', 'SQL', 'Python', 'C#/C++'],
    tools: ['Git', 'VS Code', 'Postman', 'Unit testing', 'AWS', 'Azure DevOps', 'Docker']
  };

  const visibleProjects = projects.slice(
    projectIndex * projectsPerPage,
    (projectIndex + 1) * projectsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="w-full">
          <FluidBackground />
        </div>
      </div>

      {/* Image Gallery Modal */}
      {galleryOpen !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors"
          >
            <X size={32} />
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/${visibleProjects[galleryOpen].images[currentImageIndex]}`}
              alt={`${visibleProjects[galleryOpen].title} - Image ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {visibleProjects[galleryOpen].images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800/50 hover:border-cyan-500/50 rounded-full text-white hover:text-cyan-400 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800/50 hover:border-cyan-500/50 rounded-full text-white hover:text-cyan-400 transition-all"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {visibleProjects[galleryOpen].images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? 'bg-cyan-400 w-8'
                          : 'bg-slate-400 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl z-50 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="" className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">
                &lt;SA/&gt;
              </span>
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'journey', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all relative group ${
                    activeSection === section
                      ? 'text-cyan-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all ${
                    activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
            <div className="px-4 py-4 space-y-3">
              {['home', 'journey', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 capitalize text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-4 mt-4 inline-block relative">
            <img src="/me.jpg" className="w-48 h-48 rounded-full shadow-2xl shadow-cyan-500/50" alt="Profile"></img>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sibtain Ali
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-4">
            Building enterprise solutions for professional development
          </p>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Full Stack Developer specializing in developing enterprise grade web & mobile apps
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <a 
              href="/Sibtain_Ali.pdf"
              download="Sibtain_Ali_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              <Download size={20} />
              Download Resume
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border-2 border-cyan-500/50 text-cyan-400 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
            >
              Get In Touch
            </a>
          </div>
          <div className="flex justify-center gap-6">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/sibti-ali/" className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
              <Github size={24} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sibtain-ali-73ab7a213/" className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:jsibtainali@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="journey" className="min-h-screen flex items-center py-20 px-4 relative z-10">
        <div className="w-full">
          <Timeline />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Technologies I use to build enterprise-grade applications
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 border-b border-slate-800/50">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-8 py-4 font-semibold transition-all relative ${
                activeTab === 'frontend'
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Frontend
              {activeTab === 'frontend' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-8 py-4 font-semibold transition-all relative ${
                activeTab === 'backend'
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Backend
              {activeTab === 'backend' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-8 py-4 font-semibold transition-all relative ${
                activeTab === 'tools'
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tools
              {activeTab === 'tools' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800/50 min-h-[300px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills[activeTab as keyof typeof skills].map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800 hover:border-cyan-500/50 border border-transparent transition-all group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></span>
                  <span className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Enterprise solutions and innovative applications
          </p>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 hover:border-cyan-500/50 transition-all group hover:transform hover:scale-105"
                >
                  {/* Project Image or Gradient */}
                  <div className="h-48 relative overflow-hidden cursor-pointer" onClick={() => project.images.length > 0 && openGallery(index)}>
                    {project.images.length > 0 ? (
                      <>
                        <img
                          src={`/${project.images[0]}`}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Image size={32} className="text-white" />
                          </div>
                        </div>
                        {project.images.length > 1 && (
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                            {project.images.length} photos
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={`h-full bg-gradient-to-br ${project.gradient} relative`}>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link === 'NA' ? (
                      <span className="inline-flex items-center text-gray-400 font-medium">
                        <Lock size={16} className="mr-2" />
                        Contact for demo
                      </span>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium group/link"
                      >
                        View Project 
                        <ExternalLink size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                    
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute -left-16 top-1/3 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800/50 hover:border-cyan-500/50 rounded-full text-slate-300 hover:text-cyan-400 transition-all hidden lg:flex items-center justify-center"
                  aria-label="Previous projects"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute -right-16 top-1/3 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800/50 hover:border-cyan-500/50 rounded-full text-slate-300 hover:text-cyan-400 transition-all hidden lg:flex items-center justify-center"
                  aria-label="Next projects"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Mobile Navigation */}
                <div className="flex lg:hidden justify-center gap-4 mt-8">
                  <button
                    onClick={goToPrevious}
                    className="p-2 bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800/50 hover:border-cyan-500/50 rounded-full text-slate-300 hover:text-cyan-400 transition-all"
                    aria-label="Previous projects"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setProjectIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === projectIndex
                            ? 'bg-cyan-400 w-6'
                            : 'bg-slate-600 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to page ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={goToNext}
                    className="p-2 bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800/50 hover:border-cyan-500/50 rounded-full text-slate-300 hover:text-cyan-400 transition-all"
                    aria-label="Next projects"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </span>
          </h3>
          <p className="text-slate-400 mb-6">
            Open to collaborations on enterprise applications and innovative projects
          </p>
          <a
            href="mailto:jsibtainali@gmail.com"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
          >
            Get In Touch
          </a>
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-slate-500">
            <p>&copy; 2025 Sibtain Ali. Creating cool stuff.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}