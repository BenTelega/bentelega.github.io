/**
 * Portfolio V2 - Maximalist Interactivity
 * Enhanced animations, effects, and user experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================
  // Mobile Navigation
  // ===================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Navbar scroll effect with color change
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // ===================================
  // Smooth Scroll with Parallax Effect
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight;
        
        // Add parallax effect during scroll
        document.body.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        document.body.style.transform = 'translateZ(-10px)';
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          document.body.style.transition = 'none';
          document.body.style.transform = 'none';
        }, 800);
      }
    });
  });

  // ===================================
  // Enhanced Scroll Animations
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || '0';
        entry.target.style.transitionDelay = delay + 's';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add glow effect on animation
        entry.target.style.boxShadow = '0 0 20px rgba(0, 255, 209, 0.2)';
        
        setTimeout(() => {
          entry.target.style.boxShadow = 'none';
        }, 1000);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate elements on scroll with staggered delays
  const animateElements = document.querySelectorAll(
    '.section-title, .about-grid, .skill-category, .contact-card'
  );

  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    el.dataset.delay = (index * 0.1).toFixed(1);
    observer.observe(el);
  });

  // ===================================
  // Stats Counter with Easing
  // ===================================
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          if (!isNaN(target)) {
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      current = Math.floor(target * easeOutQuart(progress));
      
      if (current >= target) {
        element.textContent = target + '+';
      } else {
        element.textContent = current + '+';
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  }

  // ===================================
  // Terminal Code Animation
  // ===================================
  const terminalBody = document.querySelector('.terminal-body');
  if (terminalBody) {
    const lines = terminalBody.querySelectorAll('.line');
    
    lines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-20px)';
      line.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
    });
    
    // Trigger animation after short delay
    setTimeout(() => {
      lines.forEach(line => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      });
    }, 300);
  }

  // ===================================
  // Hover Effects
  // ===================================
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });

  // Contact link hover effects
  const contactLinks = document.querySelectorAll('.contact-link');
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateX(10px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateX(0)';
    });
  });

  // ===================================
  // Dynamic Background Particles
  // ===================================
  function createParticles() {
    const particleCount = 30;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;
      const color = Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-secondary)';
      
      Object.assign(particle.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        background: color,
        borderRadius: '50%',
        opacity: '0.3',
        left: x + '%',
        top: y + '%',
        animation: `float ${duration}s ease-in-out infinite ${delay}s`
      });
      
      particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
  }

  // Add particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
  `;
  document.head.appendChild(style);
  
  createParticles();

  // ===================================
  // Active Nav Link Highlight
  // ===================================
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  });

  console.log('Portfolio V2 initialized with maximalist flair! 🎨✨');
});

// Add some console art for fun
console.log(`
  ██████╗ ███████╗███╗   ██╗████████╗███████╗██████╗ 
  ██╔══██╗██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
  ██████╔╝█████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
  ██╔══██╗██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
  ██║  ██║███████╗██║ ╚████║   ██║   ███████╗██║  ██║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`);