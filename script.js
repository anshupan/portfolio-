// Flash Screen Animation & Main Content Reveal
window.addEventListener('DOMContentLoaded', () => {
  const flash = document.getElementById('flash-screen');
  const main = document.getElementById('main-content');
  setTimeout(() => {
    flash.style.display = 'none';
    main.classList.remove('hidden');
    revealOnScroll();
  }, 2200); // match CSS animation duration
});

// Interactive 3D Profile Card
const card = document.getElementById('profile-3d-card');
if (card) {
  let isAnimating = false;
  let clickCount = 0;
  let lastClickTime = 0;
  
  // Enhanced 3D rotation on mouse move
  card.addEventListener('mousemove', (e) => {
    if (isAnimating) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.boxShadow = `0 0 60px #00ffe7a0, 0 0 0 4px #0a1833`;
  });
  
  card.addEventListener('mouseleave', () => {
    if (isAnimating) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow = '0 0 40px #00ffe7a0, 0 0 0 4px #0a1833';
  });
  
  // Click interactions
  card.addEventListener('click', (e) => {
    const currentTime = Date.now();
    clickCount++;
    
    // Double click detection
    if (currentTime - lastClickTime < 300) {
      // Double click - special effect
      performDoubleClickEffect();
      clickCount = 0;
    } else {
      // Single click - pulse effect
      performClickEffect();
    }
    
    lastClickTime = currentTime;
  });
  
  // Touch support with enhanced interactions
  card.addEventListener('touchstart', (e) => {
    e.preventDefault();
    card.style.transform = 'scale(0.95)';
  });
  
  card.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && !isAnimating) {
      const rect = card.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  });
  
  card.addEventListener('touchend', (e) => {
    setTimeout(() => {
      if (!isAnimating) {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      }
    }, 100);
  });
  
  // Click effects
  function performClickEffect() {
    isAnimating = true;
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, #00ffe7 0%, transparent 70%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
      animation: rippleEffect 0.6s ease-out forwards;
    `;
    
    card.appendChild(ripple);
    
    // Enhanced card animation
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.1)';
    card.style.boxShadow = '0 0 80px #00ffe7, 0 0 0 4px #0a1833';
    card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
    
    // Create particle burst effect
    createProfileParticleBurst();
    
    setTimeout(() => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.boxShadow = '0 0 40px #00ffe7a0, 0 0 0 4px #0a1833';
      card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
      
      setTimeout(() => {
        card.style.transition = '';
        isAnimating = false;
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 500);
    }, 300);
  }
  
  // Double click effects
  function performDoubleClickEffect() {
    isAnimating = true;
    
    // Create multiple ripples
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, #00ffe7 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
          animation: rippleEffect 0.8s ease-out forwards;
        `;
        card.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 800);
      }, i * 100);
    }
    
    // Special double-click animation
    card.style.transform = 'rotateX(360deg) rotateY(360deg) scale(1.2)';
    card.style.boxShadow = '0 0 100px #00ffe7, 0 0 0 4px #0a1833';
    card.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
    
    // Create enhanced particle burst
    createProfileParticleBurst(true);
    
    setTimeout(() => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.boxShadow = '0 0 40px #00ffe7a0, 0 0 0 4px #0a1833';
      
      setTimeout(() => {
        card.style.transition = '';
        isAnimating = false;
      }, 500);
    }, 800);
  }
  
  // Particle burst effect for profile card
  function createProfileParticleBurst(isDoubleClick = false) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const numParticles = isDoubleClick ? 20 : 12;
    const colors = ['#00ffe7', '#00bfff', '#0ff', '#fff'];
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      const angle = (i / numParticles) * Math.PI * 2;
      const speed = isDoubleClick ? Math.random() * 4 + 3 : Math.random() * 3 + 2;
      const size = Math.random() * 6 + 3;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 10px ${colors[Math.floor(Math.random() * colors.length)]};
        animation: profileParticleBurst 1s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      
      // Animate particle
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      setTimeout(() => {
        particle.style.transform = `translate(${vx * 50}px, ${vy * 50}px) scale(0)`;
        particle.style.opacity = '0';
      }, 50);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  }
}

// Interactive Floating Particles Animation
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let explosions = [];
  const colors = ['#00ffe7', '#00bfff', '#0ff', '#fff'];
  const numParticles = window.innerWidth > 900 ? 80 : 40;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.5 + 0.5,
        originalR: 0,
        pulsePhase: Math.random() * Math.PI * 2,
        isHovered: false,
        hoverIntensity: 0
      });
    }
  }
  createParticles();
  window.addEventListener('resize', createParticles);

  // Enhanced interactive effects
  let hoveredParticle = null;
  let hoverStartTime = 0;
  let mouseTrail = [];
  let lastMouseTime = 0;
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentTime = Date.now();
    
    // Add to mouse trail for particle attraction
    mouseTrail.push({ x, y, time: currentTime });
    if (mouseTrail.length > 10) {
      mouseTrail.shift();
    }
    
    // Check for particle hover and attraction
    let foundHover = false;
    for (const p of particles) {
      const distance = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);
      
      if (distance <= p.r + 20) { // Increased hover tolerance
        if (hoveredParticle !== p) {
          // New particle hovered
          hoveredParticle = p;
          hoverStartTime = Date.now();
          p.isHovered = true;
          p.hoverIntensity = 0;
          p.lastHoverTime = currentTime;
        }
        foundHover = true;
        
        // Particle attraction effect
        if (distance > p.r + 5) {
          const attractionForce = 0.3;
          const dx = x - p.x;
          const dy = y - p.y;
          const distanceNorm = Math.sqrt(dx * dx + dy * dy);
          if (distanceNorm > 0) {
            p.speedX += (dx / distanceNorm) * attractionForce;
            p.speedY += (dy / distanceNorm) * attractionForce;
          }
        }
        break;
      }
    }
    
    // Update mouse position for general hover effects
    canvas.mouseX = x;
    canvas.mouseY = y;
    lastMouseTime = currentTime;
    
    // If no particle is hovered, clear hover state
    if (!foundHover && hoveredParticle) {
      hoveredParticle.isHovered = false;
      hoveredParticle.hoverIntensity = 0;
      hoveredParticle = null;
    }
  });
  
  // Enhanced click interactions
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple effect at click location
    createClickRipple(x, y);
    
    // Check if any particle was clicked
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const distance = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);
      
      if (distance <= p.r + 8) { // Increased click tolerance
        // Create explosion effect
        createExplosion(p.x, p.y, p.color);
        
        // Create repulsion effect for nearby particles
        createRepulsionEffect(p.x, p.y);
        
        // Remove the clicked particle
        particles.splice(i, 1);
        
        // Add a new particle to maintain count
        setTimeout(() => {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.5 + 0.5,
            originalR: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            isHovered: false,
            hoverIntensity: 0
          });
        }, 1000);
        
        break;
      }
    }
  });

  // Touch support for mobile
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    // Check if any particle was touched
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const distance = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);
      
      if (distance <= p.r + 10) { // Larger touch tolerance
        createExplosion(p.x, p.y, p.color);
        particles.splice(i, 1);
        
        setTimeout(() => {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.5 + 0.5,
            originalR: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            isHovered: false,
            hoverIntensity: 0
          });
        }, 1000);
        
        break;
      }
    }
  });

  function createExplosion(x, y, color) {
    const numExplosionParticles = 15;
    for (let i = 0; i < numExplosionParticles; i++) {
      const angle = (i / numExplosionParticles) * Math.PI * 2;
      const speed = Math.random() * 4 + 3;
      explosions.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 4 + 2,
        color: color,
        alpha: 1,
        life: 1
      });
    }
  }
  
  function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border: 2px solid #00ffe7;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      transform: translate(-50%, -50%);
      animation: clickRipple 0.8s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }
  
  function createRepulsionEffect(x, y) {
    const repulsionRadius = 100;
    const repulsionForce = 2;
    
    for (const p of particles) {
      const distance = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);
      if (distance < repulsionRadius && distance > 0) {
        const force = (repulsionRadius - distance) / repulsionRadius * repulsionForce;
        const dx = p.x - x;
        const dy = p.y - y;
        const distanceNorm = Math.sqrt(dx * dx + dy * dy);
        
        p.speedX += (dx / distanceNorm) * force;
        p.speedY += (dy / distanceNorm) * force;
        
        // Add temporary glow effect
        p.repulsionGlow = 1;
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw explosions
    for (let i = explosions.length - 1; i >= 0; i--) {
      const exp = explosions[i];
      ctx.save();
      ctx.globalAlpha = exp.alpha * exp.life;
      ctx.beginPath();
      ctx.arc(exp.x, exp.y, exp.r, 0, 2 * Math.PI);
      ctx.fillStyle = exp.color;
      ctx.shadowColor = exp.color;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();
      
      // Update explosion
      exp.x += exp.vx;
      exp.y += exp.vy;
      exp.life -= 0.02;
      exp.alpha *= 0.98;
      
      // Remove dead explosions
      if (exp.life <= 0) {
        explosions.splice(i, 1);
      }
    }
    
    // Draw particles with enhanced interactive effects
    for (const p of particles) {
      ctx.save();
      
      // Update hover intensity
      if (p.isHovered) {
        p.hoverIntensity = Math.min(p.hoverIntensity + 0.1, 1);
      } else {
        p.hoverIntensity = Math.max(p.hoverIntensity - 0.05, 0);
      }
      
      // Update repulsion glow
      if (p.repulsionGlow) {
        p.repulsionGlow = Math.max(p.repulsionGlow - 0.02, 0);
      }
      
      // Add subtle pulse animation
      const pulse = Math.sin(Date.now() * 0.003 + p.pulsePhase) * 0.3 + 1;
      const currentR = p.r * pulse;
      
      // Enhanced hover and repulsion effects
      const hoverScale = 1 + (p.hoverIntensity * 0.5);
      const repulsionScale = 1 + (p.repulsionGlow * 0.3);
      const totalScale = hoverScale * repulsionScale;
      const hoverRadius = currentR * totalScale;
      const hoverAlpha = p.alpha + (p.hoverIntensity * 0.3) + (p.repulsionGlow * 0.2);
      const hoverBlur = 16 + (p.hoverIntensity * 20) + (p.repulsionGlow * 15);
      
      ctx.globalAlpha = hoverAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, hoverRadius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = hoverBlur;
      ctx.fill();
      
      // Add multiple glow layers for hovered particles
      if (p.hoverIntensity > 0) {
        // Outer glow
        ctx.globalAlpha = p.hoverIntensity * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, hoverRadius + 8, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 40;
        ctx.fill();
        
        // Inner glow
        ctx.globalAlpha = p.hoverIntensity * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, hoverRadius * 0.7, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.fill();
        
        // Sparkle effect for highly hovered particles
        if (p.hoverIntensity > 0.8) {
          const sparkleAngle = Date.now() * 0.01;
          const sparkleRadius = hoverRadius + 15;
          for (let i = 0; i < 4; i++) {
            const angle = sparkleAngle + (i * Math.PI / 2);
            const sparkleX = p.x + Math.cos(angle) * sparkleRadius;
            const sparkleY = p.y + Math.sin(angle) * sparkleRadius;
            
            ctx.globalAlpha = p.hoverIntensity * 0.8;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, 2, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.fill();
          }
        }
      }
      
      // Repulsion glow effect
      if (p.repulsionGlow > 0) {
        ctx.globalAlpha = p.repulsionGlow * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, hoverRadius + 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#00ffe7';
        ctx.shadowBlur = 30;
        ctx.fill();
      }
      
      // Mouse trail attraction effect
      if (mouseTrail.length > 0) {
        const lastTrail = mouseTrail[mouseTrail.length - 1];
        const trailDistance = Math.sqrt((lastTrail.x - p.x) ** 2 + (lastTrail.y - p.y) ** 2);
        if (trailDistance < 60) {
          ctx.globalAlpha = (60 - trailDistance) / 60 * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentR + 5, 0, 2 * Math.PI);
          ctx.fillStyle = '#00bfff';
          ctx.shadowBlur = 20;
          ctx.fill();
        }
      }
      
      // General proximity glow (subtle effect for nearby particles)
      const mouseX = canvas.mouseX || 0;
      const mouseY = canvas.mouseY || 0;
      const distance = Math.sqrt((mouseX - p.x) ** 2 + (mouseY - p.y) ** 2);
      if (distance < 80 && !p.isHovered) {
        ctx.globalAlpha = (80 - distance) / 80 * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR + 3, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 25;
        ctx.fill();
      }
      
      ctx.restore();
      
      // Apply speed limits to prevent particles from moving too fast
      const maxSpeed = 3;
      p.speedX = Math.max(Math.min(p.speedX, maxSpeed), -maxSpeed);
      p.speedY = Math.max(Math.min(p.speedY, maxSpeed), -maxSpeed);
      
      // Add slight friction to slow down particles over time
      p.speedX *= 0.99;
      p.speedY *= 0.99;
      
      // Move
      p.x += p.speedX;
      p.y += p.speedY;
      // Wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }
    requestAnimationFrame(drawParticles);
  }
  
  // Start the animation loop
  drawParticles();
}

// 3D Scroll Animations
function init3DScrollAnimations() {
  const sections = document.querySelectorAll('section');
  const skillCards = document.querySelectorAll('.skill-card');
  const projectCards = document.querySelectorAll('.project-card');
  const contactLinks = document.querySelectorAll('.contact-link-3d');
  
  let ticking = false;
  
  function update3DAnimations() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for sections
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (windowHeight + sectionHeight)
      ));
      
      // 3D transform based on scroll position
      const translateZ = scrollProgress * 100 - 50;
      const rotateX = scrollProgress * 10 - 5;
      const scale = 0.9 + scrollProgress * 0.1;
      
      section.style.transform = `
        perspective(1000px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        scale(${scale})
      `;
      
      // Add glow effect based on scroll position
      const glowIntensity = scrollProgress * 0.5;
      section.style.boxShadow = `
        0 0 ${32 + glowIntensity * 20}px #00ffe7${Math.floor(20 + glowIntensity * 30).toString(16)}
      `;
    });
    
    // 3D animation for skill cards
    skillCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top;
      const cardHeight = rect.height;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - cardTop) / (windowHeight + cardHeight)
      ));
      
      // Staggered animation
      const delay = index * 0.1;
      const adjustedProgress = Math.max(0, scrollProgress - delay);
      
      const translateY = (1 - adjustedProgress) * 50;
      const rotateY = adjustedProgress * 360;
      const scale = 0.8 + adjustedProgress * 0.2;
      
      card.style.transform = `
        translateY(${translateY}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      
      // Only apply opacity animation if the card is not in view
      if (adjustedProgress < 0.1) {
        card.style.opacity = 0.3;
      } else {
        card.style.opacity = 1;
      }
    });
    
    // 3D animation for project cards
    projectCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top;
      const cardHeight = rect.height;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - cardTop) / (windowHeight + cardHeight)
      ));
      
      // Different animation for projects
      const delay = index * 0.15;
      const adjustedProgress = Math.max(0, scrollProgress - delay);
      
      const translateX = (1 - adjustedProgress) * 100 * (index % 2 === 0 ? 1 : -1);
      const rotateZ = adjustedProgress * 20 * (index % 2 === 0 ? 1 : -1);
      const scale = 0.7 + adjustedProgress * 0.3;
      
      card.style.transform = `
        translateX(${translateX}px)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `;
      
      // Only apply opacity animation if the card is not in view
      if (adjustedProgress < 0.1) {
        card.style.opacity = 0.3;
      } else {
        card.style.opacity = 1;
      }
    });
    
    // 3D animation for contact links
    contactLinks.forEach((link, index) => {
      const rect = link.getBoundingClientRect();
      const linkTop = rect.top;
      const linkHeight = rect.height;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - linkTop) / (windowHeight + linkHeight)
      ));
      
      const delay = index * 0.2;
      const adjustedProgress = Math.max(0, scrollProgress - delay);
      
      const translateZ = adjustedProgress * 200;
      const rotateX = adjustedProgress * 15;
      const scale = 0.6 + adjustedProgress * 0.4;
      
      link.style.transform = `
        perspective(1000px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        scale(${scale})
      `;
      
      // Only apply opacity animation if the link is not in view
      if (adjustedProgress < 0.1) {
        link.style.opacity = 0.3;
      } else {
        link.style.opacity = 1;
      }
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update3DAnimations);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  window.addEventListener('resize', requestTick);
  
  // Initial call
  update3DAnimations();
}

// Enhanced Scroll & Section Reveal with 3D
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  const reveal = () => {
    const trigger = window.innerHeight * 0.85;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < trigger) {
        sec.classList.add('fade-in');
      }
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();
  
  // Initialize 3D scroll animations
  init3DScrollAnimations();
}

// Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
  
  @keyframes profileParticleBurst {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
  
  @keyframes clickRipple {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
      border-width: 2px;
    }
    100% {
      width: 200px;
      height: 200px;
      opacity: 0;
      border-width: 1px;
    }
  }
  
  /* 3D Scroll Animation Styles */
  section {
    transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), 
                box-shadow 0.6s cubic-bezier(0.4,0,0.2,1);
    transform-style: preserve-3d;
    opacity: 1 !important;
  }
  
  .skill-card, .project-card, .contact-link-3d {
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1), 
                opacity 0.8s cubic-bezier(0.4,0,0.2,1);
    transform-style: preserve-3d;
    opacity: 1 !important;
  }
`;
document.head.appendChild(style);