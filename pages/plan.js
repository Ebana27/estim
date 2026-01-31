/* --- plan.js --- */

let rawData = null;

// --- 0. APPEL API (Fonction utilitaire) ---
async function callApi() {
  const apiUrl = "http://localhost:5500/api/schedule";
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      console.log("Données API reçues !");
      const dataNew = await response.json();
      rawData = { schedule: dataNew }; // On reformate pour respecter la structure attendue par le reste du code

      // S'assurer que l'index du jour est valide
      if (!rawData.schedule || rawData.schedule.length <= state.dayIndex) {
        state.dayIndex = 0;
      }
    } else {
      console.error("Erreur API, statut:", response.status);
    }
  } catch (error) {
    console.error("Erreur fetch:", error);
    // Ici tu pourrais mettre des données factuelles de secours si besoin
  }
}

// --- 1. DONNÉES (Déjà géré par rawData) ---

// --- 2. ÉTAT DE L'APPLICATION ---
const state = {
  level: "L2",
  filiere: "Génie Logiciel",
  type: "Cours",
  dayIndex: 0,
  currentWeekStart: new Date(2026, 0, 1),
};

const levelMap = {
  L1: "1ère Année",
  L2: "2ème Année",
  L3: "3ème Année",
};

// --- 3. INITIALISATION ---
// IMPORTANT : On exporte cette fonction pour que main.js puisse l'appeler
// Et on la rend async pour attendre les données
export async function initPlanPage() {
  console.log("Initialisation de la page Plan...");

  // 1. On attend que les données arrivent
  await callApi();

  // 2. On affiche tout seulement après
  renderAll();
}

function renderAll() {
  renderWeekDays();
  renderSchedule();
  updateWeekDisplay();
  updateFilterStyles();
  updateFiliereDisplay();
}

// --- 4. LOGIQUE DE FILTRAGE (Inchangée) ---
window.setFilter = function (type, value) {
  if (type === "level") state.level = value;
  if (type === "filiere") state.filiere = value;
  if (type === "type") state.type = value;

  if (!rawData || !rawData.schedule || rawData.schedule.length <= state.dayIndex) {
    state.dayIndex = 0;
  }

  renderSchedule();
  updateFilterStyles();
  updateFiliereDisplay();
};

// --- 5. GESTION DE LA SEMAINE (Inchangée) ---
window.changeWeek = function (offset) {
  const newDate = new Date(state.currentWeekStart);
  newDate.setDate(newDate.getDate() + offset * 7);
  state.currentWeekStart = newDate;

  if (!rawData || !rawData.schedule || rawData.schedule.length <= state.dayIndex) {
    state.dayIndex = 0;
  }

  renderWeekDays();
  updateWeekDisplay();
  renderSchedule();
};

function updateWeekDisplay() {
  const start = new Date(state.currentWeekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 4);

  const options = { month: "short", day: "numeric" };
  const rangeStr = `${start.toLocaleDateString("fr-FR", options)} - ${end.toLocaleDateString("fr-FR", options)} ${start.getFullYear()}`;

  const rangeEl = document.getElementById("week-range");
  if (rangeEl) rangeEl.innerText = rangeStr;
}

function renderWeekDays() {
  const container = document.getElementById("days-container");
  if (!container) return;

  container.innerHTML = "";
  const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
  const date = new Date(state.currentWeekStart);

  for (let i = 0; i < 5; i++) {
    const dayNum = date.getDate();
    const btn = document.createElement("div");

    const isActive = (!rawData || !rawData.schedule || rawData.schedule.length <= i) ? false : (i === state.dayIndex);
    const baseClasses = "flex-1 h-16 rounded-estim-md flex flex-col justify-center items-center cursor-pointer transition-all duration-200 min-w-[60px]";
    const activeClasses = "bg-estim-green text-white shadow-md scale-105";
    const inactiveClasses = "bg-white text-ui-gray border border-estim-linen hover:bg-ui-light";

    btn.className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

    btn.onclick = () => {
      if (!rawData || !rawData.schedule || rawData.schedule.length <= i) {
        console.warn(`Jour indispo`);
        return;
      }
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
  const container = document.getElementById("schedule-list");
  const dateDisplay = document.getElementById("current-date-display");

  if (!container) return;

  if (!rawData || !rawData.schedule) {
    container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Chargement des données...</div>`;
    return;
  }

  container.innerHTML = "";

  if (!rawData.schedule || rawData.schedule.length <= state.dayIndex) {
    container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Aucune donnée disponible pour ce jour.</div>`;
    return;
  }

  const currentDayData = rawData.schedule[state.dayIndex];
  const dateObj = new Date(state.currentWeekStart);
  dateObj.setDate(dateObj.getDate() + state.dayIndex);

  const dateOptions = { weekday: "long", day: "numeric", month: "long" };
  if (dateDisplay) dateDisplay.innerText = dateObj.toLocaleDateString("fr-FR", dateOptions);

  if (!currentDayData || !currentDayData.sessions) {
    container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Aucune donnée disponible.</div>`;
    return;
  }

  const targetCycle = levelMap[state.level];
  const targetFiliere = state.filiere;
  const targetType = state.type;

  const filteredSessions = currentDayData.sessions
    .filter((session) => {
      const cycleMatch = session.cycle === "all" || session.cycle === targetCycle;
      const filiereMatch = session.filiere === "all" || session.filiere === targetFiliere;

      let typeMatch = false;
      if (targetType === "Sessions") {
        typeMatch = ["td", "event"].includes(session.type);
      } else if (targetType === "Devoirs") {
        typeMatch = ["exam"].includes(session.type);
      } else {
        typeMatch = session.type === "cours" || session.type === "all";
      }

      return cycleMatch && filiereMatch && typeMatch;
    })
    .filter((s) => s.type !== "break");

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
    filteredSessions.forEach((session) => {
      const endTime = calculateEndTime(session.time, session.duration);
      const card = document.createElement("div");
      card.className = "w-full bg-white rounded-estim-md p-5 border border-estim-linen shadow-sm relative flex overflow-hidden group hover:shadow-md transition-shadow";

      card.innerHTML = `
        <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-estim-green"></div>
        <div class="w-16 flex flex-col justify-center items-center mr-4 pr-4 border-r border-estim-linen">
          <span class="text-xs font-semibold text-estim-green">${session.time}</span>
          <div class="w-1 h-1 bg-estim-linen rounded-full my-2"></div>
          <span class="text-xs font-medium text-ui-gray">${endTime}</span>
        </div>
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

    const lunch = document.createElement("div");
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
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  let durationMinutes = 0;
  if (duration.includes("h")) {
    const parts = duration.split("h");
    durationMinutes = parseInt(parts[0]) * 60 + (parseInt(parts[1]) || 0);
  } else {
    durationMinutes = 60;
  }

  const endTotalMinutes = totalMinutes + durationMinutes;
  const endHours = Math.floor(endTotalMinutes / 60);
  const endMins = endTotalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}`;
}

window.downloadSchedule = function () {
  localStorage.setItem("estim_schedule", JSON.stringify(rawData));

  const toast = document.createElement("ion-toast");
  toast.message = "Emploi du temps sauvegardé localement!";
  toast.duration = 2000;
  toast.color = "success";
  toast.position = "bottom";
  document.body.appendChild(toast);
  return toast.present();
};

// On NE MET PAS le addEventListener ici, c'est géré par main.js