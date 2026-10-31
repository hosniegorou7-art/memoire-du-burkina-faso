/**
 * FASO QUIZ ENGINE - ESPACE ÉDUCATIF & TRANSMISSION CULTURELLE
 * Quiz interactif sur les contes, légendes, langues et histoire du Burkina Faso.
 * Validation instantanée, explications historiques et attribution de rang culturel.
 */

class FasoQuizEngine {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.questions = [...FASO_QUIZ];
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.onClose = options.onClose || null;
  }

  start() {
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.render();
  }

  close() {
    if (this.container) {
      this.container.classList.add("hidden");
    }
    if (this.onClose) this.onClose();
  }

  answerQuestion(optionIndex) {
    const q = this.questions[this.currentIndex];
    const isCorrect = optionIndex === q.correct;
    if (isCorrect) this.score++;
    this.userAnswers.push({ questionIndex: this.currentIndex, chosen: optionIndex, isCorrect });
    this.renderFeedback(optionIndex, isCorrect);
  }

  render() {
    if (!this.container) return;
    if (this.currentIndex >= this.questions.length) {
      this.renderFinalScore();
      return;
    }

    const q = this.questions[this.currentIndex];
    const progressPercent = ((this.currentIndex) / this.questions.length) * 100;

    this.container.classList.remove("hidden");
    this.container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
        <div class="relative w-full max-w-2xl flex flex-col bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden animate-fade-in text-stone-100">

          <!-- En-tête -->
          <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-amber-900/40">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎓</span>
              <div>
                <h3 class="text-sm font-bold text-amber-200">Transmission & Sagesse du Faso</h3>
                <p class="text-[11px] text-amber-400/80">Question ${this.currentIndex + 1} sur ${this.questions.length} • Score : ${this.score}</p>
              </div>
            </div>
            <button id="btn-close-quiz" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-all text-base font-bold">
              ✕
            </button>
          </div>

          <!-- Barre de progression -->
          <div class="w-full bg-stone-950 h-1.5">
            <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-1.5 transition-all duration-300" style="width: ${progressPercent}%"></div>
          </div>

          <!-- Corps de la question -->
          <div class="p-6 md:p-8 space-y-6" id="quiz-body">
            <div class="text-xs uppercase tracking-wider text-amber-400 font-bold">Énigme culturelle</div>
            <h2 class="text-lg sm:text-xl font-bold text-stone-100 leading-snug">
              ${q.question}
            </h2>

            <!-- Options de réponses -->
            <div class="space-y-3">
              ${q.options.map((opt, idx) => `
                <button class="quiz-option-btn w-full text-left p-4 rounded-xl bg-stone-950/60 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/60 transition-all flex items-center gap-3 text-sm font-medium text-stone-200 group" data-idx="${idx}">
                  <span class="w-7 h-7 rounded-lg bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center border border-stone-700 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all shrink-0">
                    ${String.fromCharCode(65 + idx)}
                  </span>
                  <span>${opt}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Pied de page -->
          <div class="px-6 py-3 bg-stone-950 border-t border-amber-900/40 flex items-center justify-between text-xs text-stone-400">
            <div>Quiz de transmission • Éducation patrimoniale</div>
            <button id="btn-quiz-close-bottom" class="hover:text-amber-300 transition-colors">Quitter</button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderFeedback(chosenIdx, isCorrect) {
    const q = this.questions[this.currentIndex];
    const quizBody = this.container.querySelector("#quiz-body");
    if (!quizBody) return;

    quizBody.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <div class="p-4 rounded-2xl ${isCorrect ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-200' : 'bg-rose-950/40 border border-rose-500/50 text-rose-200'} flex items-start gap-3">
          <span class="text-2xl">${isCorrect ? '✨' : '📖'}</span>
          <div>
            <div class="font-bold text-base mb-1">${isCorrect ? 'Excellente réponse !' : 'Bonne tentative !'}</div>
            <p class="text-xs sm:text-sm text-stone-200 leading-relaxed">${q.explanation}</p>
          </div>
        </div>

        <div class="text-center pt-3">
          <button id="btn-next-question" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold text-sm shadow-lg hover:scale-105 transition-all">
            ${this.currentIndex + 1 < this.questions.length ? 'Question Suivante ➔' : 'Découvrir mon Rang Culturel 🏆'}
          </button>
        </div>
      </div>
    `;

    const nextBtn = this.container.querySelector("#btn-next-question");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentIndex++;
        this.render();
      });
    }
  }

  renderFinalScore() {
    let rankTitle = "Initié des Veillées";
    let rankDesc = "Vous commencez votre voyage au cœur de la sagesse orale burkinabè.";
    let icon = "🌱";

    if (this.score >= 7) {
      rankTitle = "Grand Griot & Maître de la Parole";
      rankDesc = "Une connaissance admirable du patrimoine, des langues et des symboles du Faso ! Les ancêtres sont fiers de vous.";
      icon = "👑";
    } else if (this.score >= 4) {
      rankTitle = "Gardien des Coutumes du Faso";
      rankDesc = "Un esprit attentif et éclairé. Les récits des 17 régions résonnent en vous.";
      icon = "🛡️";
    }

    const quizBody = this.container.querySelector("#quiz-body");
    if (!quizBody) return;

    quizBody.innerHTML = `
      <div class="text-center space-y-4 py-4 animate-fade-in">
        <div class="text-5xl">${icon}</div>
        <div class="text-xs uppercase tracking-widest text-amber-400 font-bold">Certificat de Transmission</div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-200">${rankTitle}</h2>
        <div class="text-4xl font-black text-white font-mono">${this.score} / ${this.questions.length}</div>
        <p class="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
          ${rankDesc}
        </p>

        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button id="btn-retry-quiz" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold text-xs shadow-lg hover:scale-105 transition-all">
            🔄 Recommencer le Quiz
          </button>
          <button id="btn-finish-quiz" class="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 transition-all">
            Retour à l'Accueil
          </button>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector("#btn-retry-quiz");
    const finishBtn = this.container.querySelector("#btn-finish-quiz");
    if (retryBtn) retryBtn.addEventListener("click", () => this.start());
    if (finishBtn) finishBtn.addEventListener("click", () => this.close());
  }

  bindEvents() {
    const closeBtn = this.container.querySelector("#btn-close-quiz");
    const bottomCloseBtn = this.container.querySelector("#btn-quiz-close-bottom");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (bottomCloseBtn) bottomCloseBtn.addEventListener("click", () => this.close());

    const optionBtns = this.container.querySelectorAll(".quiz-option-btn");
    optionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        this.answerQuestion(idx);
      });
    });
  }
}

window.FasoQuizEngine = FasoQuizEngine;
