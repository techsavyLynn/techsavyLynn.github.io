// script.js

// 🚀 Tech Galaxy Starfield with Neon Constellations, Animated Nebula & Hover Tooltips

const canvasBack = document.getElementById("galaxy-bg-back");
const canvasMid = document.getElementById("galaxy-bg-mid");
const canvasFront = document.getElementById("galaxy-bg-front");
const canvasNebula = document.createElement("canvas");
canvasNebula.id = "galaxy-nebula";
document.body.prepend(canvasNebula);

const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.padding = "5px 10px";
tooltip.style.background = "rgba(0, 255, 255, 0.2)";
tooltip.style.border = "1px solid #00ffff";
tooltip.style.color = "#00ffff";
tooltip.style.fontSize = "12px";
tooltip.style.fontFamily = "monospace";
tooltip.style.pointerEvents = "none";
tooltip.style.display = "none";
tooltip.style.borderRadius = "4px";
tooltip.style.zIndex = "9999";
document.body.appendChild(tooltip);

function resizeCanvasToFullPage(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
}

[canvasBack, canvasMid, canvasFront, canvasNebula].forEach(resizeCanvasToFullPage);
window.addEventListener("resize", () => {
  [canvasBack, canvasMid, canvasFront, canvasNebula].forEach(resizeCanvasToFullPage);
});

function getRandomTechColor() {
  const colors = ["#00ffff", "#66ffcc", "#ffffff"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function StarField(canvas, count, sizeRange, speedRange) {
  const ctx = canvas.getContext("2d");
  this.stars = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * sizeRange + 0.5,
    speed: Math.random() * speedRange + 0.3,
    color: getRandomTechColor(),
    label: `Star ${i + 1}`
  }));

  this.draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.stars.forEach(star => {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.shadowBlur = 5;
      ctx.shadowColor = star.color;
      ctx.fillStyle = star.color;
      ctx.fill();
    });
  };
}

const backLayer = new StarField(canvasBack, 100, 0.6, 0.2);
const midLayer = new StarField(canvasMid, 150, 1.2, 0.4);
const frontLayer = new StarField(canvasFront, 80, 2.0, 0.7);

let nebulaOffsetX = 0;
let nebulaOffsetY = 0;

function animateGalaxy() {
  backLayer.draw();
  midLayer.draw();
  frontLayer.draw();
  drawNebula();
  drawConstellations(canvasFront, frontLayer.stars);
  requestAnimationFrame(animateGalaxy);
}

function drawNebula() {
  const ctx = canvasNebula.getContext("2d");
  ctx.clearRect(0, 0, canvasNebula.width, canvasNebula.height);

  nebulaOffsetX += 0.05;
  nebulaOffsetY += 0.03;

  const cx = canvasNebula.width / 2 + Math.sin(nebulaOffsetX) * 50;
  const cy = canvasNebula.height / 2 + Math.sin(nebulaOffsetY) * 50;

  const gradient = ctx.createRadialGradient(cx, cy, 100, cx, cy, canvasNebula.width / 1.2);
  gradient.addColorStop(0, "rgba(0,255,255,0.05)");
  gradient.addColorStop(0.4, "rgba(138,43,226,0.05)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasNebula.width, canvasNebula.height);
}

function drawConstellations(canvas, stars) {
  const ctx = canvas.getContext("2d");
  const maxDistance = 100;
  ctx.beginPath();

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
      }
    }
  }

  ctx.strokeStyle = "rgba(0, 255, 255, 0.15)";
  ctx.lineWidth = 0.6;
  ctx.shadowBlur = 6 + Math.sin(Date.now() / 500) * 2;
  ctx.shadowColor = "#00ffff";
  ctx.stroke();
}

canvasFront.addEventListener("mousemove", (e) => {
  const rect = canvasFront.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  let found = false;

  for (const star of frontLayer.stars) {
    const dx = mouseX - star.x;
    const dy = mouseY - star.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 8) {
      tooltip.textContent = star.label;
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.style.display = "block";
      found = true;
      break;
    }
  }

  if (!found) tooltip.style.display = "none";
});

animateGalaxy();

// Intro Hi There
const phrases = [
  "👋 Hey there, I’m Lino John",
  "💼 Data Enthusiast • Technologist",
  "📍 Based in United Kingdom",
  "🧠 Turning data into decisions"
];
let currentPhrase = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter-text");

function typeWriterLoop() {
  const currentText = phrases[currentPhrase];
  const displayedText = isDeleting
    ? currentText.substring(0, charIndex--)
    : currentText.substring(0, charIndex++);

  typewriterElement.innerHTML = displayedText;

  if (!isDeleting && charIndex === currentText.length + 1) {
    isDeleting = true;
    setTimeout(typeWriterLoop, 1500); // pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(typeWriterLoop, 500);
  } else {
    setTimeout(typeWriterLoop, isDeleting ? 50 : 100);
  }
}

document.addEventListener("DOMContentLoaded", typeWriterLoop);


// Page fade-in transition

 

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


document.addEventListener('DOMContentLoaded', () => {
  // Animate with IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .skill-card, .blog-post, .timeline-item').forEach(el => {
    observer.observe(el);
  });

  // Theme toggle button
  const toggleBtn = document.getElementById('theme-toggle');
  const clickSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    clickSound.play();
  });


  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
  });

  // Floating Action Button Scroll
  document.querySelector('.fab').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });

  // Nav underline effect
  const navLinks = document.querySelectorAll('.nav-links a');
  const underline = document.querySelector('.nav-underline');

  function updateUnderline(el) {
    const rect = el.getBoundingClientRect();
    const navRect = el.closest('.nav-links').getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
  }

  function updateActiveUnderline() {
    let closestLink = null;
    let closestDistance = Infinity;
    const fromTop = window.scrollY;

    navLinks.forEach(link => {
      const target = document.getElementById(link.dataset.target);
      const offset = Math.abs(target.offsetTop - fromTop);
      if (offset < closestDistance) {
        closestDistance = offset;
        closestLink = link;
      }
    });

    if (closestLink) updateUnderline(closestLink);
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateUnderline(link));
    link.addEventListener('focus', () => updateUnderline(link));
  });

  document.querySelector('.nav-links').addEventListener('mouseleave', updateActiveUnderline);
  window.addEventListener('scroll', updateActiveUnderline);
  updateActiveUnderline();
});


// Feather icons replacement
feather.replace();

// Clean up original <i data-feather="..."> tags to remove duplication
document.querySelectorAll('i[data-feather]').forEach(el => el.remove());

// Preloader
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
  document.body.classList.add("loaded");
});




document.querySelectorAll('.timeline-filters button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;

    document.querySelectorAll('.timeline-filters button').forEach(btn =>
      btn.classList.remove('active')
    );
    button.classList.add('active');

    document.querySelectorAll('.timeline-card').forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const timelineCards = document.querySelectorAll('.timeline-card');
const dots = document.querySelectorAll('.timeline-dots .dot');

window.addEventListener('scroll', () => {
  timelineCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }
  });
});


  const logo = document.querySelector('.navbar-logo');

  logo.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default anchor jump
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
  });
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}
function resizeCanvasToFullPage(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
}

resizeCanvasToFullPage(canvasBack);
resizeCanvasToFullPage(canvasMid);
resizeCanvasToFullPage(canvasFront);


window.addEventListener('resize', () => {
  resizeCanvasToFullPage(canvasBack);
  resizeCanvasToFullPage(canvasMid);
  resizeCanvasToFullPage(canvasFront);
});


document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.gallery-slider');
  let scrollAmount = 0;

  function autoScroll() {
    scrollAmount += 1;
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
    }
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }

  setInterval(autoScroll, 30);
});



document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("carousel-wrapper");
  const scrollStep = wrapper.clientWidth + 32;

  let autoScroll;

  function scrollLoop() {
    wrapper.scrollBy({ left: scrollStep, behavior: "smooth" });

    setTimeout(() => {
      if (wrapper.scrollLeft >= wrapper.scrollWidth / 2) {
        // Seamless loop: jump back to original content
        wrapper.scrollLeft = 0;
      }
    }, 700); // match scroll animation duration
  }

  function startAutoScroll() {
    autoScroll = setInterval(scrollLoop, 4000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  wrapper.addEventListener("mouseenter", stopAutoScroll);
  wrapper.addEventListener("mouseleave", startAutoScroll);

  startAutoScroll();

  // Buttons
  document.querySelector(".nav-btn.left").addEventListener("click", () => {
    wrapper.scrollBy({ left: -scrollStep, behavior: "smooth" });
    setTimeout(() => {
      if (wrapper.scrollLeft <= 0) {
        wrapper.scrollLeft = wrapper.scrollWidth / 2;
      }
    }, 700);
  });

  document.querySelector(".nav-btn.right").addEventListener("click", () => {
    scrollLoop();
  });


   const numberEl = document.getElementById("experience-number");
  if (numberEl) {
    let count = 0;
    const end = 7;
    const interval = setInterval(() => {
      count++;
      numberEl.textContent = `${count} Yr`;
      if (count === end) clearInterval(interval);
    }, 100);
  }
});


window.addEventListener('scroll', () => {
  const header = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const offset = 80; // header height
    const target = document.querySelector(this.getAttribute("href"));
    const top = target.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
