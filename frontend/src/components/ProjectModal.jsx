import React, { useState, useEffect, useCallback } from 'react';
import { X, Github, Globe, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { CleanLogo } from './CleanLogo';

const StatusBadge = ({ status }) =>
  status === 'live' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Live System
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
      In Active Dev
    </span>
  );

export const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const { name, tagline, logo, screenshot, screenshots, status, summary, details, stack, links } = project;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project.id]);

  const imageList = screenshots || (screenshot ? [screenshot] : []);
  const hasMultipleImages = imageList.length > 1;
  const currentImage = imageList[currentImageIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomImage) {
          setZoomImage(null);
        } else {
          triggerClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [triggerClose, zoomImage]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) triggerClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70"
      style={{
        transition: 'opacity 400ms ease-out, backdrop-filter 400ms ease-out',
        opacity: !isMounted || isClosing ? 0 : 1,
        backdropFilter: !isMounted || isClosing ? 'blur(0px)' : 'blur(12px)',
        WebkitBackdropFilter: !isMounted || isClosing ? 'blur(0px)' : 'blur(12px)'
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container with MacBook tilting lid open/close effect */}
      <div 
        className="w-full max-w-5xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease-out',
          transform: !isMounted 
            ? 'scale(0.96) rotateX(-16deg) translateY(24px)' 
            : isClosing
              ? 'scale(0.96) rotateX(-16deg) translateY(24px)'
              : 'scale(1) rotateX(0deg) translateY(0deg)',
          opacity: !isMounted || isClosing ? 0 : 1
        }}
      >
        {/* Top Header Section */}
        <div className="relative px-5 py-5 sm:px-6 sm:py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-start gap-4 pr-14">
          {logo && (
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white flex items-center justify-center p-1">
              <CleanLogo src={logo} alt={name} className="max-h-full max-w-full object-contain" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 truncate sm:whitespace-normal">{name}</h3>
              <div className="w-fit">
                <StatusBadge status={status} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{tagline}</p>
          </div>
          
          <button 
            onClick={triggerClose}
            className="absolute top-5 right-4 p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition z-10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector bar */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-x-auto scrollbar-none whitespace-nowrap">
          {['overview', 'features', 'stack'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-3.5 border-b-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold transition-all duration-200 outline-none shrink-0 ${
                activeTab === tab 
                  ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab === 'stack' ? (
                <>
                  <span className="hidden sm:inline">Tech Stack & Links</span>
                  <span className="sm:hidden">Tech Stack</span>
                </>
              ) : tab === 'features' ? (
                <>
                  <span className="hidden sm:inline">Key Features</span>
                  <span className="sm:hidden">Features</span>
                </>
              ) : (
                'Overview'
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {currentImage && (
                <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm group/carousel">
                  {/* Sliding Tray */}
                  <div 
                    className="flex w-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {imageList.map((img, idx) => (
                      <div key={idx} className="w-full shrink-0">
                        <img 
                          src={img} 
                          alt={`${name} preview ${idx + 1}`} 
                          onClick={() => setZoomImage(img)}
                          className="w-full h-auto max-h-[480px] object-cover object-top cursor-zoom-in hover:brightness-95 transition duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {hasMultipleImages && (
                    <>
                      {/* Left navigation arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-900/90 text-white border border-zinc-700/50 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition duration-300 shadow-md"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      {/* Right navigation arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-900/90 text-white border border-zinc-700/50 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition duration-300 shadow-md"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Carousel Indicator Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-zinc-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-800/30">
                        {imageList.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              currentImageIndex === idx ? 'bg-cyan-400 w-3' : 'bg-white/50'
                            }`}
                            aria-label={`Go to screenshot ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <h4 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">Project Overview</h4>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {summary}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Key Features */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {details.map((group) => (
                <div key={group.title} className="p-5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10">
                  <h4 className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-100 font-bold border-b border-zinc-200/50 dark:border-zinc-800/50 pb-2">
                    {group.title}
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
                      >
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Tech Stack & Links */}
          {activeTab === 'stack' && (
            <div className="space-y-8">
              {/* Technologies */}
              <div>
                <h4 className="font-display text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-4">Development Environment</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 font-mono text-xs text-zinc-700 dark:text-zinc-300 hover:border-cyan-500/35 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Actions Links */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <h4 className="font-display text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-4">Access Deployment</h4>
                <div className="flex flex-wrap gap-3">
                  {links.live && (
                    <a
                      href={links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 hover:shadow-cyan-500/20 hover:brightness-110 transition duration-300"
                    >
                      <Globe size={16} />
                      Open Live Project
                    </a>
                  )}
                  {links.source && (
                    <a
                      href={links.source}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-zinc-900 dark:hover:border-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition duration-300"
                    >
                      <Github size={16} />
                      Inspect Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Lightbox Photo zoom overlay */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-lg cursor-zoom-out p-4"
          style={{
            transition: 'opacity 300ms ease-out',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
          }}
          onClick={() => setZoomImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomImage(null);
            }}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900/90 text-white border border-zinc-700/50 backdrop-blur-sm transition duration-300 shadow-md"
            aria-label="Close zoom preview"
          >
            <X size={22} />
          </button>
          <img 
            src={zoomImage} 
            alt="Widescreen details zoom" 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-zinc-800/40 animate-scale-up"
          />
        </div>
      )}
    </div>
  );
};
