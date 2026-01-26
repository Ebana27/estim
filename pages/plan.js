/* --- plan.js --- */

// --- 1. DONNÉES (Votre JSON) ---
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
        { "time": "09:00", "duration": "2h", "title": "Mathématiques Générales", "type": "cours", "room": "Salle A201", "professor": "M. Dupont", "filiere": "Génie Logiciel", "cycle": "1ère Année" },
        { "time": "11:30", "duration": "1h30", "title": "Informatique - Algorithmie", "type": "cours", "room": "Labo Informatique 3", "professor": "Mme. Martin", "filiere": "Génie Logiciel", "cycle": "1ère Année" },
        { "time": "13:30", "duration": "1h", "title": "Déjeuner", "type": "break", "room": "Cafétéria Principale", "professor": "", "filiere": "all", "cycle": "all" },
        { "time": "14:30", "duration": "1h30", "title": "Anglais Technique", "type": "td", "room": "Salle A303", "professor": "M. Girard", "filiere": "all", "cycle": "all" }
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
    }
  ]
};

// --- 2. ÉTAT DE L'APPLICATION ---
const state = {
    level: 'L2',         // Défaut selon HTML
    filiere: 'Génie Logiciel', // Défaut selon HTML
    type: 'Cours',       // Défaut selon HTML
    dayIndex: 1,         // Mardi (Index 1)
    currentWeekStart: new Date(2025, 0, 15) // 15 Jan 2025
};

// Mapping pour la logique de filtrage
const levelMap = {
    'L1': '1ère Année',
    'L2': '2ème Année',
    'L3': '3ème Année'
};

const typeMap = {
    'Cours': 'cours',
    'Devoirs': 'exam',
    'Sessions': 'td'
};

// --- 3. INITIALISATION ---
function initPlan() {
    renderAll();
}

function renderAll() {
    renderWeekDays();
    renderSchedule();
    updateWeekDisplay();
    updateFilterStyles();
    updateFiliereDisplay();
}

// --- 4. LOGIQUE DE FILTRAGE ---
window.setFilter = function(type, value) {
    // Mise à jour de l'état
    if (type === 'level') state.level = value;
    if (type === 'filiere') state.filiere = value;
    if (type === 'type') state.type = value;
    
    // Rafraîchissement de l'UI
    renderSchedule();
    updateFilterStyles();
    updateFiliereDisplay();
};

function updateFilterStyles() {
    // Mise à jour visuelle des boutons de Niveau
    document.querySelectorAll('.level-btn').forEach(btn => {
        const val = btn.getAttribute('data-level');
        if (val === state.level) {
            // Actif : Vert + Blanc
            btn.className = "level-btn flex-1 h-12 rounded-estim-sm text-sm font-medium transition-all duration-200 bg-estim-green text-white shadow-md";
        } else {
            // Inactif : Blanc + Gris
            btn.className = "level-btn flex-1 h-12 rounded-estim-sm text-sm font-medium transition-all duration-200 border border-estim-linen bg-white text-ui-gray";
        }
    });

    // Mise à jour visuelle des boutons de Type
    document.querySelectorAll('.type-btn').forEach(btn => {
        const val = btn.getAttribute('data-type');
        if (val === state.type) {
            btn.className = "type-btn flex-1 h-10 rounded-estim-sm text-xs font-medium transition-all duration-200 bg-estim-green text-white shadow-sm";
        } else {
            btn.className = "type-btn flex-1 h-10 rounded-estim-sm text-xs font-medium transition-all duration-200 border border-estim-linen bg-white text-ui-gray";
        }
    });
}

function updateFiliereDisplay() {
    const display = document.getElementById('filiere-display').querySelector('div');
    const select = document.getElementById('filiere-select');

    if(select) select.value = state.filiere;

    if (state.filiere === 'all') {
        if(display) display.innerText = 'Tous';
    } else if (state.filiere === 'Génie Logiciel') {
        // Affiche "Génie Informatique" quand la valeur est "Génie Logiciel"
        if(display) display.innerText = 'Génie Informatique (GI)';
    } else {
        if(display) display.innerText = state.filiere;
    }
}

// --- 5. GESTION DE LA SEMAINE ET DES JOURS ---
window.changeWeek = function(offset) {
    const newDate = new Date(state.currentWeekStart);
    newDate.setDate(newDate.getDate() + (offset * 7));
    state.currentWeekStart = newDate;
    
    renderWeekDays();
    updateWeekDisplay();
    renderSchedule();
};

function updateWeekDisplay() {
    const start = new Date(state.currentWeekStart);
    const end = new Date(start);
    end.setDate(end.getDate() + 4);
    
    const options = { month: 'short', day: 'numeric' };
    const rangeStr = `${start.toLocaleDateString('fr-FR', options)} - ${end.toLocaleDateString('fr-FR', options)} ${start.getFullYear()}`;
    
    const rangeEl = document.getElementById('week-range');
    if(rangeEl) rangeEl.innerText = rangeStr;
}

function renderWeekDays() {
    const container = document.getElementById('days-container');
    if(!container) return;
    
    container.innerHTML = '';
    const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
    const date = new Date(state.currentWeekStart);

    for (let i = 0; i < 5; i++) {
        const dayNum = date.getDate();
        const btn = document.createElement('div');
        
        // Détermination des classes Tailwind
        const isActive = i === state.dayIndex;
        const baseClasses = "flex-1 h-16 rounded-estim-md flex flex-col justify-center items-center cursor-pointer transition-all duration-200 min-w-[60px]";
        const activeClasses = "bg-estim-green text-white shadow-md scale-105";
        const inactiveClasses = "bg-white text-ui-gray border border-estim-linen hover:bg-ui-light";
        
        btn.className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
        
        // Gestionnaire de clic interne pour éviter de polluer window avec une fonction anonyme
        btn.onclick = () => {
            state.dayIndex = i;
            renderWeekDays();
            renderSchedule();
        };

        btn.innerHTML = `
            <div class="text-xs font-medium mb-1 opacity-90">${labels[i]}</div>
            <div class="text-lg font-bold">${dayNum}</div>
        `;
        container.appendChild(btn);
        date.setDate(date.getDate() + 1);
    }
}

// --- 6. RENDU DE LA LISTE (Schedule) ---
function renderSchedule() {
    const container = document.getElementById('schedule-list');
    const dateDisplay = document.getElementById('current-date-display');
    
    if(!container) return;

    // Nettoyage
    container.innerHTML = '';

    // Récupération données du jour
    const currentDayData = rawData.schedule[state.dayIndex];
    const dateObj = new Date(state.currentWeekStart);
    dateObj.setDate(dateObj.getDate() + state.dayIndex);
    
    // Mise à jour du header date
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    if(dateDisplay) dateDisplay.innerText = dateObj.toLocaleDateString('fr-FR', dateOptions);

    if (!currentDayData || !currentDayData.sessions) {
        container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Aucune donnée disponible.</div>`;
        return;
    }

    // Filtrage
    const targetCycle = levelMap[state.level];
    const targetFiliere = state.filiere;
    const targetType = state.type;

    const filteredSessions = currentDayData.sessions.filter(session => {
        // 1. Cycle (Année)
        const cycleMatch = session.cycle === 'all' || session.cycle === targetCycle;
        
        // 2. Filière
        const filiereMatch = session.filiere === 'all' || session.filiere === targetFiliere;
        
        // 3. Type
        let typeMatch = false;
        if (targetType === 'Sessions') {
            typeMatch = ['td', 'event'].includes(session.type);
        } else if (targetType === 'Devoirs') {
            typeMatch = ['exam'].includes(session.type);
        } else {
            // Cours
            typeMatch = session.type === 'cours' || session.type === 'all';
        }

        return cycleMatch && filiereMatch && typeMatch;
    }).filter(s => s.type !== 'break'); // Retire les pauses de la liste principale

    // Affichage
    if (filteredSessions.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 bg-white rounded-estim-md border border-estim-linen border-dashed">
                <div class="w-12 h-12 bg-ui-light rounded-full flex items-center justify-center mb-3 text-estim-walnut">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p class="text-sm font-medium text-ui-gray">Aucun cours prévu.</p>
            </div>
        `;
    } else {
        filteredSessions.forEach(session => {
            const endTime = calculateEndTime(session.time, session.duration);
            const card = document.createElement('div');
            
            // Style de la carte conforme au design ESTIM
            card.className = "w-full bg-white rounded-estim-md p-5 border border-estim-linen shadow-sm relative flex overflow-hidden group hover:shadow-md transition-shadow";
            
            card.innerHTML = `
                <!-- Barre latérale verte -->
                <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-estim-green"></div>
                
                <!-- Colonne Heure -->
                <div class="w-16 flex flex-col justify-center items-center mr-4 pr-4 border-r border-estim-linen">
                    <span class="text-xs font-semibold text-estim-green">${session.time}</span>
                    <div class="w-1 h-1 bg-estim-linen rounded-full my-2"></div>
                    <span class="text-xs font-medium text-ui-gray">${endTime}</span>
                </div>

                <!-- Colonne Info -->
                <div class="flex-1 flex flex-col justify-center">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-sm font-bold text-estim-black leading-tight pr-2 w-3/4">${session.title}</h3>
                        <span class="text-[10px] font-bold uppercase tracking-wide bg-estim-pollen text-estim-black px-2 py-0.5 rounded-full">${session.duration}</span>
                    </div>
                    
                    ${session.professor ? `
                    <div class="flex items-center gap-2 text-xs text-estim-walnut mb-1 font-medium">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <span>${session.professor}</span>
                    </div>` : ''}

                    <div class="flex items-center gap-2 text-xs text-ui-gray">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        <span>${session.room}</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Ajout visuel de la pause déjeuner
        const lunch = document.createElement('div');
        lunch.className = "w-full h-10 flex justify-center items-center relative my-4";
        lunch.innerHTML = `
            <div class="w-full h-px bg-estim-linen absolute left-0"></div>
            <div class="bg-estim-linen/30 px-4 py-1 rounded-full text-[10px] font-bold text-estim-walnut uppercase tracking-wider z-10 backdrop-blur-sm">Pause Déjeuner</div>
        `;
        container.appendChild(lunch);
    }
}

// --- 7. UTILITAIRES ---
function calculateEndTime(time, duration) {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    let durationMinutes = 0;
    if (duration.includes('h')) {
        const parts = duration.split('h');
        durationMinutes = (parseInt(parts[0]) * 60) + (parseInt(parts[1]) || 0);
    } else { 
        durationMinutes = 60; 
    }
    
    const endTotalMinutes = totalMinutes + durationMinutes;
    const endHours = Math.floor(endTotalMinutes / 60);
    const endMins = endTotalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
}

window.downloadSchedule = function() {
    localStorage.setItem('estim_schedule', JSON.stringify(rawData));
    
    // Utilisation d'Ionic Toast si disponible, sinon alert
    const toast = document.createElement('ion-toast');
    toast.message = 'Emploi du temps sauvegardé localement!';
    toast.duration = 2000;
    toast.color = 'success';
    toast.position = 'bottom';
    document.body.appendChild(toast);
    return toast.present();
};

// Lancement au chargement du DOM
document.addEventListener('DOMContentLoaded', initPlan);