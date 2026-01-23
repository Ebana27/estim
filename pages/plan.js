// --- 1. DONNÉES FAKE ---
const rawData = {
  "schedule": [
    {
      "date": "2026-01-19",
      "day": "Lundi",
      "sessions": [
        { "time": "08:00", "duration": "1h30", "title": "Réunion d'accueil", "type": "event", "room": "Amphithéâtre Principal", "professor": "Direction Académique", "filiere": "all", "cycle": "all" },
        { "time": "09:30", "duration": "2h", "title": "Mathématiques Avancées", "type": "cours", "room": "Salle A101", "professor": "M. Dupont", "filiere": "Génie Logiciel", "cycle": "2ème Année" },
        { "time": "11:30", "duration": "30min", "title": "Pause Café", "type": "break", "room": "Hall d'accueil", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "12:00", "duration": "2h", "title": "Programmation Web", "type": "td", "room": "Labo Informatique 1", "professor": "Mme. Martin", "filiere": "Génie Logiciel", "cycle": "1ère Année" },
        { "time": "14:30", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "15:30", "duration": "2h", "title": "Réseaux TCP/IP", "type": "cours", "room": "Salle B201", "professor": "M. Leclerc", "filiere": "Réseaux & Télécoms", "cycle": "2ème Année" }
      ]
    },
    {
      "date": "2026-01-20",
      "day": "Mardi",
      "sessions": [
        { "time": "09:00", "duration": "2h", "title": "Physique Quantique", "type": "cours", "room": "Labo P202", "professor": "Mme. Bernard", "filiere": "Réseaux & Télécoms", "cycle": "3ème Année" },
        { "time": "11:15", "duration": "1h30", "title": "Gestion Financière", "type": "cours", "room": "Salle B301", "professor": "M. Durand", "filiere": "Gestion & Commerce", "cycle": "2ème Année" },
        { "time": "13:00", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:00", "duration": "2h", "title": "Chimie Organique", "type": "td", "room": "Labo C101", "professor": "Mme. Rousseau", "filiere": "Ingénierie Système", "cycle": "1ère Année" },
        { "time": "16:45", "duration": "1h30", "title": "Anglais Technique", "type": "cours", "room": "Salle A205", "professor": "Mme. Smith", "filiere": "all", "cycle": "all" }
      ]
    },
    {
      "date": "2026-01-21",
      "day": "Mercredi",
      "sessions": [
        { "time": "10:00", "duration": "2h", "title": "Français - Littérature", "type": "cours", "room": "Salle A101", "professor": "Mme. Lambert", "filiere": "Gestion & Commerce", "cycle": "1ère Année" },
        { "time": "12:15", "duration": "1h30", "title": "Éducation Physique", "type": "td", "room": "Gymnase 2", "professor": "M. Petit", "filiere": "all", "cycle": "all" },
        { "time": "14:00", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "15:00", "duration": "1h30", "title": "Géographie - Géopolitique", "type": "cours", "room": "Salle B102", "professor": "M. Moreau", "filiere": "Gestion & Commerce", "cycle": "2ème Année" }
      ]
    },
    {
      "date": "2026-01-22",
      "day": "Jeudi",
      "sessions": [
        { "time": "09:00", "duration": "2h", "title": "Biologie Cellulaire", "type": "cours", "room": "Labo B202", "professor": "Mme. Monique", "filiere": "Ingénierie Système", "cycle": "1ère Année" },
        { "time": "11:30", "duration": "1h30", "title": "Projets Informatiques", "type": "td", "room": "Salle Collaboration 1", "professor": "M. Laurent", "filiere": "Génie Logiciel", "cycle": "2ème Année" },
        { "time": "13:30", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:30", "duration": "1h30", "title": "Histoire - Révolution", "type": "cours", "room": "Salle A303", "professor": "M. Girard", "filiere": "Gestion & Commerce", "cycle": "1ère Année" }
      ]
    },
    {
      "date": "2026-01-23",
      "day": "Vendredi",
      "sessions": [
        { "time": "09:00", "duration": "3h", "title": "Révisions Générales", "type": "cours", "room": "Amphithéâtre", "professor": "Équipe pédagogique", "filiere": "all", "cycle": "all" },
        { "time": "12:15", "duration": "1h30", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:00", "duration": "2h", "title": "Test de Contrôle - Mathématiques", "type": "exam", "room": "Salle Exam 501", "professor": "Surveillance M. Dupont", "filiere": "Génie Logiciel", "cycle": "1ère Année" },
        { "time": "14:00", "duration": "2h", "title": "QCM - Gestion d'entreprise", "type": "exam", "room": "Salle Exam 502", "professor": "Surveillance M. Durand", "filiere": "Gestion & Commerce", "cycle": "2ème Année" }
      ]
    },
    {
      "date": "2026-01-26",
      "day": "Lundi",
      "sessions": [
        { "time": "08:30", "duration": "2h", "title": "Calcul Intégral", "type": "cours", "room": "Salle A101", "professor": "M. Dupont", "filiere": "Génie Logiciel", "cycle": "2ème Année" },
        { "time": "10:45", "duration": "30min", "title": "Pause", "type": "break", "room": "Hall d'accueil", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "11:15", "duration": "2h", "title": "Base de Données Avancées", "type": "td", "room": "Labo Informatique 2", "professor": "M. Vincent", "filiere": "Génie Logiciel", "cycle": "2ème Année" },
        { "time": "13:30", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:30", "duration": "1h30", "title": "Marketing Digital", "type": "cours", "room": "Salle B301", "professor": "Mme. Céline", "filiere": "Gestion & Commerce", "cycle": "1ère Année" }
      ]
    },
    {
      "date": "2026-01-27",
      "day": "Mardi",
      "sessions": [
        { "time": "09:00", "duration": "2h", "title": "Mécanique des Fluides", "type": "cours", "room": "Labo P202", "professor": "Mme. Sophie", "filiere": "Ingénierie Système", "cycle": "2ème Année" },
        { "time": "11:15", "duration": "1h30", "title": "Ressources Humaines", "type": "cours", "room": "Salle B305", "professor": "M. Fabien", "filiere": "Gestion & Commerce", "cycle": "3ème Année" },
        { "time": "13:00", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:00", "duration": "2h", "title": "Électronique - TP", "type": "td", "room": "Labo E101", "professor": "M. Pierre", "filiere": "Réseaux & Télécoms", "cycle": "2ème Année" }
      ]
    },
    {
      "date": "2026-01-28",
      "day": "Mercredi",
      "sessions": [
        { "time": "10:00", "duration": "2h", "title": "Rédaction et Communication", "type": "td", "room": "Salle A205", "professor": "Mme. Pauline", "filiere": "Gestion & Commerce", "cycle": "1ère Année" },
        { "time": "12:15", "duration": "1h30", "title": "Éducation Physique", "type": "td", "room": "Gymnase 1", "professor": "M. Pascal", "filiere": "all", "cycle": "all" },
        { "time": "14:00", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "15:00", "duration": "1h30", "title": "Architecture Logicielle", "type": "cours", "room": "Salle B201", "professor": "M. Nicolas", "filiere": "Génie Logiciel", "cycle": "3ème Année" }
      ]
    },
    {
      "date": "2026-01-29",
      "day": "Jeudi",
      "sessions": [
        { "time": "09:00", "duration": "2h", "title": "Microbiologie", "type": "td", "room": "Labo B303", "professor": "Mme. Nadège", "filiere": "Ingénierie Système", "cycle": "1ère Année" },
        { "time": "11:30", "duration": "1h30", "title": "Cloud Computing", "type": "td", "room": "Labo Informatique 3", "professor": "M. Olivier", "filiere": "Génie Logiciel", "cycle": "2ème Année" },
        { "time": "13:30", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:30", "duration": "1h30", "title": "Économie Internationale", "type": "cours", "room": "Salle B305", "professor": "M. Rémi", "filiere": "Gestion & Commerce", "cycle": "2ème Année" }
      ]
    },
    {
      "date": "2026-01-30",
      "day": "Vendredi",
      "sessions": [
        { "time": "09:00", "duration": "2h", "title": "Révisions - Préparation", "type": "cours", "room": "Amphithéâtre", "professor": "Équipe pédagogique", "filiere": "all", "cycle": "all" },
        { "time": "11:15", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "12:30", "duration": "2h", "title": "Examen Pratique - Programmation", "type": "exam", "room": "Labo Informatique 1", "professor": "Surveillance M. Martin", "filiere": "Génie Logiciel", "cycle": "2ème Année" },
        { "time": "14:00", "duration": "2h", "title": "QCM - Commerce International", "type": "exam", "room": "Salle Exam 501", "professor": "Surveillance Mme. Pauline", "filiere": "Gestion & Commerce", "cycle": "3ème Année" }
      ]
    }
  ]
};

// const rawData = fetch('/Data/schedule.json').json()

// Fonction d'initialisation appelée par le routeur
export function initPlanPage() {
  // Attendre que le DOM soit prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePlan);
  } else {
    initializePlan();
  }
}

function initializePlan() {
  // Récupérer les éléments DOM
  const container = document.getElementById('schedule-container');
  const cycleSelect = document.getElementById('cycle-select');
  const filiereSelect = document.getElementById('filiere-select');
  const typeSelect = document.getElementById('type-select');
  const resetBtn = document.getElementById('reset-filters');
  const validateBtn = document.getElementById('validate-btn');

  // Formatter la date en Français (ex: 19 Janvier 2026)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // --- LOGIQUE DE RENDU ---
  function renderSchedule(filteredData) {
    // Effacer le conteneur
    if(container) {
      container.innerHTML = '';

      // Si aucune donnée
      if (filteredData.length === 0) {
        container.innerHTML = `
          <div class="flex flex-col items-center justify-center py-20 text-center fade-in-up">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ion-icon name="search-outline" class="text-4xl text-gray-300"></ion-icon>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p class="text-gray-500 text-sm max-w-xs">Essayez de modifier vos filtres pour voir plus de cours.</p>
          </div>
        `;
        return;
      }

      // Boucle sur les jours
      filteredData.forEach((dayData, dayIndex) => {
        // Créer le wrapper du jour
        const dayWrapper = document.createElement('div');
        dayWrapper.className = 'fade-in-up';
        dayWrapper.style.animationDelay = `${dayIndex * 100}ms`;

        // Header de date
        const dateHeader = `
          <div class="date-header flex items-baseline gap-2">
            <span class="text-2xl font-bold text-estim-black">${dayData.day}</span>
            <span class="text-sm font-medium text-gray-500">${formatDate(dayData.date)}</span>
          </div>
        `;

        // Liste des sessions
        const timeline = document.createElement('div');
        timeline.className = 'pl-2 sm:pl-4 mt-2 relative';

        dayData.sessions.forEach((session, index) => {
          const isLast = index === dayData.sessions.length - 1;
          const item = document.createElement('div');
          item.className = `timeline-item flex gap-4 mb-6 relative ${isLast ? 'mb-0' : ''}`;
          
          // Type styling
          let badgeClass = 'type-break';
          let icon = 'cafe-outline';
          if(session.type === 'cours') { badgeClass = 'type-cours'; icon = 'book-outline'; }
          if(session.type === 'td') { badgeClass = 'type-td'; icon = 'hammer-outline'; }
          if(session.type === 'exam') { badgeClass = 'type-exam'; icon = 'alert-circle-outline'; }
          if(session.type === 'event') { badgeClass = 'type-event'; icon = 'megaphone-outline'; }

          // Si c'est un break, style un peu différent
          const isBreak = session.type === 'break';
          const cardBg = isBreak ? 'bg-gray-50' : 'bg-white';
          const cardShadow = isBreak ? 'shadow-none border border-gray-200' : 'shadow-soft border border-estim-border';

          item.innerHTML = `
            <!-- Timeline Line -->
            <div class="timeline-line w-9 absolute left-0"></div>
            
            <!-- Time Bubble -->
            <div class="relative z-10 flex flex-col items-center pt-1 min-w-[3rem]">
              <div class="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm">
                ${session.time}
              </div>
            </div>

            <!-- Session Card -->
            <div class="flex-1 ${cardBg} ${cardShadow} rounded-2xl p-4 transition-transform active:scale-[0.99] hover:border-estim-green/30">
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-lg ${badgeClass}">
                  ${session.type} • ${session.duration}
                </span>
                ${!isBreak ? `
                <div class="flex items-center text-xs text-gray-400 gap-1 bg-gray-50 px-2 py-1 rounded-md">
                  <ion-icon name="location-outline"></ion-icon>
                  ${session.room}
                </div>` : ''}
              </div>

              <h3 class="text-base font-bold text-gray-900 mb-1 leading-tight">${session.title}</h3>
              
              ${session.professor ? `
              <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <ion-icon name="person-outline"></ion-icon>
                <span class="truncate">${session.professor}</span>
              </div>` : ''}

              ${!isBreak && (session.filiere !== 'all' || session.cycle !== 'all') ? `
              <div class="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                 ${session.filiere !== 'all' ? `<span class="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">${session.filiere}</span>` : ''}
                 ${session.cycle !== 'all' ? `<span class="text-[10px] bg-estim-green/10 text-estim-green px-2 py-0.5 rounded-full font-medium">${session.cycle}</span>` : ''}
              </div>
              ` : ''}
            </div>
          `;
          timeline.appendChild(item);
        });

        dayWrapper.innerHTML = dateHeader;
        dayWrapper.appendChild(timeline);
        container.appendChild(dayWrapper);
      });
    }
  }

  // --- LOGIQUE DE FILTRAGE ---
  function filterData() {
    if(!cycleSelect || !filiereSelect || !typeSelect) return;
    
    const cycleValue = cycleSelect.value;
    const filiereValue = filiereSelect.value;
    const typeValue = typeSelect.value;

    // Filtrer le tableau principal
    const filteredSchedule = rawData.schedule.map(day => {
      // Filtrer les sessions du jour
      const matchingSessions = day.sessions.filter(session => {
        // Logique "all" : si filtre == 'all' OU session == 'all' -> true
        const matchCycle = (cycleValue === 'all' || session.cycle === 'all' || session.cycle === cycleValue);
        const matchFiliere = (filiereValue === 'all' || session.filiere === 'all' || session.filiere === filiereValue);
        const matchType = (typeValue === 'all' || session.type === typeValue);

        return matchCycle && matchFiliere && matchType;
      });

      // Retourner l'objet jour modifié
      return { ...day, sessions: matchingSessions };
    }).filter(day => {
      // Supprimer les jours vides complètement après filtrage
      return day.sessions.length > 0;
    });

    // Afficher le bouton reset si un filtre est actif
    if (resetBtn) {
      if (cycleValue !== 'all' || filiereValue !== 'all' || typeValue !== 'all') {
        resetBtn.classList.remove('hidden');
      } else {
        resetBtn.classList.add('hidden');
      }
    }

    renderSchedule(filteredSchedule);
  }

  // --- EVENT LISTENERS ---
  if(validateBtn) {
    // Bouton Appliquer
    validateBtn.addEventListener('click', () => {
      // Petit effet visuel de chargement sur le bouton
      const originalText = validateBtn.innerHTML;
      validateBtn.innerHTML = `<ion-icon name="reload-outline" class="animate-spin text-lg"></ion-icon> <span>Filtrage...</span>`;
      
      setTimeout(() => {
        filterData();
        validateBtn.innerHTML = originalText;
        // Scroll léger vers les résultats
        if(container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // 300ms fake delay for better UX feel
    });
  }

  if(resetBtn) {
    // Bouton Reset
    resetBtn.addEventListener('click', () => {
      if(cycleSelect) cycleSelect.value = 'all';
      if(filiereSelect) filiereSelect.value = 'all';
      if(typeSelect) typeSelect.value = 'all';
      if(resetBtn) resetBtn.classList.add('hidden');
      
      // Re-render avec toutes les données
      renderSchedule(rawData.schedule);
    });
  }

  // --- INITIALISATION ---
  // Afficher tout au chargement
  renderSchedule(rawData.schedule);
}