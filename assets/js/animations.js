// Animações baseadas no scroll
document.addEventListener("DOMContentLoaded", function () {
  // Função para verificar se elemento está visível
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Função para animar elementos no scroll (corrigida)
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".diferenciais .card, .servicos .card, .especialista-card, .fale-card, .estrutura .galeria-item"
    );

    elements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add("fade-in-visible");
      }
    });
  }

  // Aplicar animação inicial aos elementos (corrigida)
  const animatedElements = document.querySelectorAll(
    ".diferenciais .card, .servicos .card, .especialista-card, .fale-card, .estrutura .galeria-item"
  );
  animatedElements.forEach((element) => {
    element.classList.remove("fade-in-visible");
    element.classList.add("fade-in");
  });

  // Garantir que todos os elementos animados fiquem visíveis ao carregar a página
  setTimeout(() => {
    animatedElements.forEach((element) => {
      element.classList.add("fade-in-visible");
    });
  }, 200);

  // Event listeners para scroll
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);

  // Efeito de parallax suave para o hero
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Animação para contador de números (se houver)
  function animateNumbers() {
    const numbers = document.querySelectorAll(".number-counter");
    numbers.forEach((number) => {
      const target = parseInt(number.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        number.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Efeito de hover para cards
  document
    .querySelectorAll(".card, .especialista-card, .fale-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

  // Animação para formulário
  const form = document.querySelector(".form-contato");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Animação de loading no botão
      const button = this.querySelector("button");
      const originalText = button.textContent;
      button.textContent = "Enviando...";
      button.classList.add("loading");

      // Simular envio
      setTimeout(() => {
        button.textContent = "Mensagem enviada!";
        button.style.background = "#4CAF50";

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("loading");
          button.style.background = "";
          this.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Animação para ícones flutuantes
  const icons = document.querySelectorAll(".card-icon svg");
  icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
  });

  // Efeito de digitação para títulos
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Aplicar efeito de digitação ao título principal
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }

  // Animação para especialidades (corrigida)
  document
    .querySelectorAll(".especialista-especialidades li")
    .forEach((item) => {
      item.classList.add("fade-in");
      setTimeout(() => {
        item.classList.add("fade-in-visible");
      }, 300);
    });

  // Efeito de revelação para imagens
  const images = document.querySelectorAll(
    ".especialista-foto img, .estrutura .galeria-item img"
  );
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "0";
      this.style.transform = "scale(0.8)";

      setTimeout(() => {
        this.style.transition = "all 0.5s ease";
        this.style.opacity = "1";
        this.style.transform = "scale(1)";
      }, 100);
    });
  });

  // Animação para navegação ativa
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Efeito de partículas flutuantes (opcional)
  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(232, 156, 174, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            animation: float-up 8s linear infinite;
        `;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 8000);
  }

  // Criar partículas periodicamente
  setInterval(createParticle, 3000);

  // Adicionar CSS para partículas
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .fade-in-item {
            opacity: 0;
            transform: translateX(-20px);
            animation: fadeInLeft 0.5s ease forwards;
        }
        
        nav a.active {
            color: #e89cae;
        }
        
        nav a.active::after {
            width: 100%;
        }
    `;
  document.head.appendChild(style);

  // Animação para loading inicial
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Animar elementos sequencialmente
    const heroElements = document.querySelectorAll(".hero-content > *");
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 200);
    });
  });

  // Efeito de cursor personalizado (opcional)
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(232, 156, 174, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Esconder cursor personalizado em dispositivos móveis
  if ("ontouchstart" in window) {
    cursor.style.display = "none";
  }
});

// Adicionar classe para animações de entrada
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  document
    .querySelectorAll(
      ".diferenciais .card, .servicos .card, .especialista-card, .fale-card, .estrutura .galeria-item"
    )
    .forEach((el) => {
      observer.observe(el);
    });
});

// Menu mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Toggle menu mobile
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", function (event) {
    if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Fechar menu ao redimensionar a tela
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Animações de scroll
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animateElements = document.querySelectorAll(
    ".card, .galeria-item, .especialista-card, .fale-card"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
});

// Smooth scroll para links internos
document.addEventListener("DOMContentLoaded", function () {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Efeito de loading para imagens
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.classList.add("loading");

    img.addEventListener("load", function () {
      this.classList.remove("loading");
      this.classList.add("loaded");
    });

    img.addEventListener("error", function () {
      this.classList.remove("loading");
      this.style.display = "none";
    });
  });
});

// Animação de contador (opcional)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Lazy loading para imagens
document.addEventListener("DOMContentLoaded", function () {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
});

// Melhorar performance de scroll
let ticking = false;

function updateOnScroll() {
  // Adicionar efeitos de parallax ou outras animações baseadas no scroll aqui
  ticking = false;
}

window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// Adicionar classe ativa ao link da navegação baseado na seção atual
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Executar uma vez no carregamento
});
