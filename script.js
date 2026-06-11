/* ============================================
   AGRINHO – script.js
   ============================================ */

"use strict";

/* ==========================================
   1. MOBILE NAV TOGGLE
   ========================================== */
const navToggle = document.getElementById("navToggle");
const nav       = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.textContent = isOpen ? "✕" : "☰";
});

// Close nav when a link is clicked
nav.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.textContent = "☰";
  });
});


/* ==========================================
   2. ANIMATED COUNTERS
   ========================================== */
const stats = [
  { id: "statYear",     target: 1993,    suffix: "",  duration: 1400 },
  { id: "statStudents", target: 2000000, suffix: "+", duration: 1800 },
  { id: "statCities",   target: 399,     suffix: "",  duration: 1200 },
];

function animateCounter(el, target, duration, suffix) {
  const start = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = Math.floor(eased * target);

    el.textContent = current.toLocaleString("pt-BR") + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Fire counters when the "sobre" section enters viewport
const sobreSection = document.getElementById("sobre");
let countersRun    = false;

const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersRun) {
    countersRun = true;
    stats.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) animateCounter(el, s.target, s.duration, s.suffix);
    });
  }
}, { threshold: 0.3 });

counterObserver.observe(sobreSection);


/* ==========================================
   3. PILARES CARDS (dynamic render)
   ========================================== */
const pilares = [
  {
    icon: "🌱",
    title: "Sustentabilidade",
    desc:  "Práticas agrícolas que preservam os recursos naturais para as gerações futuras, aliando produção responsável ao equilíbrio ambiental.",
  },
  {
    icon: "🏫",
    title: "Educação no Campo",
    desc:  "Formação de estudantes rurais e urbanos com conteúdos que integram conhecimento técnico, científico e cultural do agronegócio.",
  },
  {
    icon: "🤝",
    title: "Cidadania",
    desc:  "Valorização da identidade rural, promoção da ética e fortalecimento dos laços entre campo e cidade por meio do diálogo.",
  },
  {
    icon: "💧",
    title: "Meio Ambiente",
    desc:  "Conscientização sobre o uso responsável da água, conservação do solo e proteção da biodiversidade nos agroecossistemas.",
  },
  {
    icon: "🚜",
    title: "Agronegócio",
    desc:  "Compreensão da cadeia produtiva agropecuária, da porteira ao prato, mostrando como o campo alimenta o Brasil e o mundo.",
  },
  {
    icon: "🌍",
    title: "Inovação Rural",
    desc:  "Tecnologia a serviço do campo: drones, sensoriamento remoto, agricultura de precisão e o futuro do trabalho rural.",
  },
];

const cardsGrid = document.getElementById("cardsGrid");

pilares.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${i * 0.08}s`;
  card.innerHTML = `
    <div class="card__icon">${p.icon}</div>
    <h3 class="card__title">${p.title}</h3>
    <p class="card__desc">${p.desc}</p>
  `;
  cardsGrid.appendChild(card);
});

// Animate cards on scroll
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity  = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".card").forEach(card => {
  card.style.opacity   = "0";
  card.style.transform = "translateY(32px)";
  card.style.transition = "opacity .5s ease, transform .5s ease";
  cardObserver.observe(card);
});


/* ==========================================
   4. GALLERY
   ========================================== */
const galleryItems = [
  { emoji: "🌾", label: "Lavoura de Trigo",   bg: "linear-gradient(135deg,#c8a84b,#7a6020)" },
  { emoji: "🐄", label: "Pecuária Leiteira",  bg: "linear-gradient(135deg,#6aaa60,#2d7a4f)" },
  { emoji: "🌽", label: "Milho e Soja",       bg: "linear-gradient(135deg,#e8c040,#c0801a)" },
  { emoji: "🍅", label: "Hortifrúti",         bg: "linear-gradient(135deg,#e86060,#a02020)" },
  { emoji: "🌳", label: "Reflorestamento",    bg: "linear-gradient(135deg,#40a060,#1a4d2e)" },
  { emoji: "🏙️",  label: "Campo e Cidade",    bg: "linear-gradient(135deg,#6080c0,#203060)" },
];

const gallery = document.getElementById("gallery");

galleryItems.forEach(item => {
  const div = document.createElement("div");
  div.className = "gallery__item";
  div.setAttribute("role", "img");
  div.setAttribute("aria-label", item.label);
  div.innerHTML = `
    <div class="gallery__bg" style="background:${item.bg}">
      <span style="font-size:3.8rem">${item.emoji}</span>
      <span class="gallery__caption">${item.label}</span>
    </div>
  `;
  gallery.appendChild(div);
});


/* ==========================================
   5. QUIZ
   ========================================== */
const questions = [
  {
    q: "Qual estado brasileiro é o maior produtor de soja?",
    options: ["São Paulo", "Mato Grosso", "Paraná", "Goiás"],
    correct: 1,
    explanation: "O Mato Grosso lidera a produção de soja no Brasil há vários anos consecutivos.",
  },
  {
    q: "O que é agricultura de precisão?",
    options: [
      "Plantar apenas em solos perfeitos",
      "Uso de tecnologia para otimizar insumos e produção",
      "Colheita feita à mão com cuidado",
      "Técnica de irrigação manual",
    ],
    correct: 1,
    explanation: "Agricultura de precisão usa GPS, sensores e dados para aplicar insumos somente onde e quando necessário.",
  },
  {
    q: "O Programa Agrinho é uma iniciativa de qual sistema?",
    options: ["EMBRAPA", "FAEP/SENAR-PR", "Ministério da Educação", "IBGE"],
    correct: 1,
    explanation: "O Agrinho é desenvolvido pelo Sistema FAEP/SENAR-PR desde 1993.",
  },
  {
    q: "Qual prática ajuda a conservar o solo e reduzir a erosão?",
    options: [
      "Queimadas controladas",
      "Plantio em nível (curvas de nível)",
      "Monocultura intensiva",
      "Revolvimento diário do solo",
    ],
    correct: 1,
    explanation: "O plantio em curvas de nível acompanha o relevo e reduz significativamente a erosão hídrica.",
  },
  {
    q: "De onde vem a maior parte dos alimentos consumidos nas cidades brasileiras?",
    options: ["Importação", "Hortas urbanas", "Produção rural / agropecuária", "Fazendas verticais"],
    correct: 2,
    explanation: "A produção rural responde por mais de 90% dos alimentos consumidos no Brasil.",
  },
];

let current  = 0;
let score    = 0;
let answered = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions  = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext     = document.getElementById("quizNext");
const quizCounter  = document.getElementById("quizCounter");
const quizBar      = document.getElementById("quizBar");
const quizBox      = document.getElementById("quizBox");
const quizResult   = document.getElementById("quizResult");
const resultEmoji  = document.getElementById("resultEmoji");
const resultScore  = document.getElementById("resultScore");
const resultMsg    = document.getElementById("resultMsg");
const quizRestart  = document.getElementById("quizRestart");

function renderQuestion() {
  const q  = questions[current];
  answered = false;

  quizCounter.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  quizBar.style.width     = `${((current + 1) / questions.length) * 100}%`;
  quizQuestion.textContent = q.q;
  quizFeedback.textContent = "";
  quizFeedback.className   = "quiz__feedback";
  quizNext.style.display   = "none";
  quizOptions.innerHTML    = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className        = "quiz__option";
    btn.textContent      = opt;
    btn.addEventListener("click", () => selectOption(btn, i));
    quizOptions.appendChild(btn);
  });
}

function selectOption(btn, index) {
  if (answered) return;
  answered = true;

  const correct = questions[current].correct;

  document.querySelectorAll(".quiz__option").forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add("correct");
  });

  if (index === correct) {
    score++;
    btn.classList.add("correct");
    quizFeedback.textContent = "✅ Correto! " + questions[current].explanation;
    quizFeedback.className   = "quiz__feedback ok";
  } else {
    btn.classList.add("wrong");
    quizFeedback.textContent = "❌ Incorreto. " + questions[current].explanation;
    quizFeedback.className   = "quiz__feedback err";
  }

  quizNext.style.display = "inline-block";
  quizNext.textContent   = current < questions.length - 1 ? "Próxima →" : "Ver resultado";
}

quizNext.addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.style.display    = "none";
  quizResult.style.display = "block";

  const pct = (score / questions.length) * 100;

  let emoji, msg;
  if (pct === 100) {
    emoji = "🏆"; msg = "Perfeito! Você é um verdadeiro especialista em Agrinho!";
  } else if (pct >= 60) {
    emoji = "🌱"; msg = "Muito bom! Continue estudando para alcançar 100%!";
  } else {
    emoji = "📚"; msg = "Continue aprendendo! O campo tem muito a ensinar.";
  }

  resultEmoji.textContent = emoji;
  resultScore.textContent = `${score} de ${questions.length} acertos`;
  resultMsg.textContent   = msg;
}

quizRestart.addEventListener("click", () => {
  current  = 0;
  score    = 0;
  quizResult.style.display = "none";
  quizBox.style.display    = "block";
  renderQuestion();
});

// Init
renderQuestion();


/* ==========================================
   6. CONTACT FORM
   ========================================== */
const contactForm  = document.getElementById("contactForm");
const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError    = document.getElementById("nameError");
const emailError   = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess  = document.getElementById("formSuccess");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(input, errorEl, msg) {
  input.classList.add("invalid");
  errorEl.textContent = msg;
  return false;
}

function clearError(input, errorEl) {
  input.classList.remove("invalid");
  errorEl.textContent = "";
  return true;
}

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  formSuccess.textContent = "";

  let valid = true;

  if (nameInput.value.trim().length < 2) {
    valid = setError(nameInput, nameError, "Por favor, insira seu nome completo.");
  } else {
    clearError(nameInput, nameError);
  }

  if (!validateEmail(emailInput.value.trim())) {
    valid = setError(emailInput, emailError, "Por favor, insira um e-mail válido.");
  } else {
    clearError(emailInput, emailError);
  }

  if (messageInput.value.trim().length < 10) {
    valid = setError(messageInput, messageError, "A mensagem deve ter pelo menos 10 caracteres.");
  } else {
    clearError(messageInput, messageError);
  }

  if (valid) {
    // Simulate form submission
    contactForm.reset();
    formSuccess.textContent = "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.";
    setTimeout(() => { formSuccess.textContent = ""; }, 5000);
  }
});

// Live validation
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("invalid");
    const id  = input.id;
    const err = document.getElementById(id + "Error");
    if (err) err.textContent = "";
  });
});


/* ==========================================
   7. FADE-IN ON SCROLL (generic)
   ========================================== */
const fadeEls = document.querySelectorAll(".stat, .gallery__item");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = "1";
      e.target.style.transform = "translateY(0)";
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity   = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity .5s ease, transform .5s ease";
  fadeObserver.observe(el);
});
