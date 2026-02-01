/* --- plan.js --- */
import { btnInteraction } from "../main.js";

const levBtn1 = document.getElementById("levelBtn1");
const levBtn2 = document.getElementById("levelBtn2");
const levBtn3 = document.getElementById("levelBtn3");

const typBtn1 = document.getElementById("typeBtn1");
const typBtn2 = document.getElementById("typeBtn2");
const typBtn3 = document.getElementById("typeBtn3");

btnInteraction(levBtn2, levBtn1, levBtn3);
btnInteraction(levBtn3, levBtn1, levBtn2);
btnInteraction(levBtn1, levBtn2, levBtn3);

btnInteraction(typBtn2, typBtn1, typBtn3);
btnInteraction(typBtn3, typBtn1, typBtn2);
btnInteraction(typBtn1, typBtn2, typBtn3);

let rawData = null;

// --- 0. APPEL API (Modifiée pour accepter une date) ---
async function callApi(startDate = null) {
  // Si aucune date n'est fournie, on utilise celle de l'état actuel
  const dateToFetch = startDate || state.currentWeekStart;
  
  // Formatage de la date pour l'API (YYYY-MM-DD)
  const formattedDate = dateToFetch.toISOString().split('T')[0];
  
  const apiUrl = `http://localhost:5500/api/schedule?date=${formattedDate}`;
  
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      console.log(`Données API reçues pour la semaine du ${formattedDate} !`);
      const dataNew = await response.json();
      rawData = { schedule: dataNew };

      if (!rawData.schedule || rawData.schedule.length <= state.dayIndex) {
        state.dayIndex = 0;
      }
      // On force le rafraîchissement de l'écran après reception des nouvelles données
      renderAll();
    } else {
      console.error("Erreur API, statut:", response.status);
    }
  } catch (error) {
    console.error("Erreur fetch:", error);
  }
}

// --- 1. LOGIQUE DE DATE (CORRECTION DU SAMEDI/DIMANCHE) ---

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajuste pour trouver le Lundi
  d.setDate(diff);

  // --- CORRECTION IMPORTANTE ---
  // Si on est Samedi (6) ou Dimanche (0), on force l'affichage sur la semaine SUIVANTE
  const today = new Date();
  const currentDay = today.getDay();
  
  // On compare juste les jours pour savoir si on est en week-end
  if (currentDay === 6 || currentDay === 0) {
    console.log("Week-end détecté : Passage à la semaine prochaine.");
    d.setDate(d.getDate() + 7);
  }
  
  return d;
}

const dateSys = new Date();

const state = {
  level: "L2",
  filiere: "Génie Logiciel",
  type: "Cours",
  dayIndex: 0,
  // Initialisation avec la logique "Sauter le week-end"
  currentWeekStart: getStartOfWeek(dateSys), 
};


const levelMap = {
  L1: "1ère Année",
  L2: "2ème Année",
  L3: "3ème Année",
};

// --- 2. INITIALISATION ---
export async function initPlanPage() {
  console.log("Initialisation de la page Plan...");
  // Premier appel API pour charger la bonne semaine (ex: Février si on est Dimanche)
  await callApi();
}

function renderAll() {
  renderWeekDays();
  renderSchedule();
  updateWeekDisplay();
  updateFilterStyles();
  updateFiliereDisplay();
}

// --- 3. LOGIQUE DE FILTRAGE ---
window.setFilter = function (type, value) {
  if (type === "level") state.level = value;
  if (type === "filiere") state.filiere = value;
  if (type === "type") state.type = value;
  renderSchedule();
  updateFilterStyles();
  updateFiliereDisplay();
};

// --- 4. GESTION DE LA SEMAINE (CHANGE SEMAINE) ---
window.changeWeek = function (offset) {
  // 1. Calculer la nouvelle date de début de semaine
  const newDate = new Date(state.currentWeekStart);
  newDate.setDate(newDate.getDate() + offset * 7);
  state.currentWeekStart = newDate;

  // 2. Appeler l'API pour charger les cours de cette NOUVELLE semaine
  // C'est ici que les dates "vedette" vont changer
  callApi(state.currentWeekStart);
};

function updateWeekDisplay() {
  const start = new Date(state.currentWeekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 4);

  const options = { month: "short", day: "numeric" };
  
  // Affichage plus propre : on n'affiche l'année que si nécessaire, ou on raccourcit
  // Ex: "27 Jan - 02 Fév"
  const rangeStr = `${start.toLocaleDateString("fr-FR", options)} - ${end.toLocaleDateString("fr-FR", options)}`;

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

    // Vérification si le jour est sélectionné
    const isActive = i === state.dayIndex;
    
    const baseClasses =
      "flex-1 h-16 rounded-estim-md flex flex-col justify-center items-center cursor-pointer transition-all duration-200 min-w-[60px]";
    const activeClasses = "bg-green-400 text-white shadow-md scale-105";
    const inactiveClasses =
      "bg-white text-ui-gray border border-estim-linen hover:bg-ui-light";

    btn.className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

    btn.onclick = () => {
      state.dayIndex = i;
      renderWeekDays(); // Re-render pour mettre à jour la sélection visuelle
      renderSchedule(); // Mettre à jour la liste des cours
    };

    // Affichage uniquement du numéro du jour (plus propre)
    btn.innerHTML = `
      <div class="text-xs font-medium mb-1 opacity-90">${labels[i]}</div>
      <div class="text-lg font-bold">${dayNum}</div>
    `;
    container.appendChild(btn);
    
    // Incrémenter pour le prochain jour
    date.setDate(date.getDate() + 1);
  }
}

// --- 5. RENDU DE LA LISTE (Schedule) ---
function renderSchedule() {
  const container = document.getElementById("schedule-list");
  const dateDisplay = document.getElementById("current-date-display");

  if (!container) return;

  if (!rawData || !rawData.schedule) {
    container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Chargement...</div>`;
    return;
  }

  container.innerHTML = "";

  // Sécurité si l'API ne renvoie pas assez de jours
  if (!rawData.schedule || rawData.schedule.length <= state.dayIndex) {
    container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Aucune donnée pour ce jour.</div>`;
    return;
  }

  const currentDayData = rawData.schedule[state.dayIndex];
  
  // Calcul de la date affichée (Lundi + index)
  const dateObj = new Date(state.currentWeekStart);
  dateObj.setDate(dateObj.getDate() + state.dayIndex);

  const dateOptions = { weekday: "long", day: "numeric", month: "long" };
  if (dateDisplay)
    dateDisplay.innerText = dateObj.toLocaleDateString("fr-FR", dateOptions);

  if (!currentDayData || !currentDayData.sessions) {
    container.innerHTML = `<div class="text-center py-10 text-ui-gray italic">Aucune donnée disponible.</div>`;
    return;
  }

  const targetCycle = levelMap[state.level];
  const targetFiliere = state.filiere;
  const targetType = state.type;

  const filteredSessions = currentDayData.sessions
    .filter((session) => {
      const cycleMatch =
        session.cycle === "all" || session.cycle === targetCycle;
      const filiereMatch =
        session.filiere === "all" || session.filiere === targetFiliere;

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
        <p class="text-sm font-medium text-ui-gray">Aucun cours prévu.</p>
      </div>
    `;
  } else {
    filteredSessions.forEach((session) => {
      const endTime = calculateEndTime(session.time, session.duration);
      const card = document.createElement("div");
      card.className =
        "w-full bg-white rounded-estim-md p-5 border border-estim-linen shadow-sm relative flex overflow-hidden group hover:shadow-md transition-shadow";

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
          ${
            session.professor
              ? `
          <div class="flex items-center gap-2 text-xs text-estim-walnut mb-1 font-medium">
            <span>${session.professor}</span>
          </div>`
              : ""
          }
          <div class="flex items-center gap-2 text-xs text-ui-gray">
            <span>${session.room}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Ajout pause déjeuner
    const lunch = document.createElement("div");
    lunch.className = "w-full h-10 flex justify-center items-center relative my-4";
    lunch.innerHTML = `<div class="w-full h-px bg-estim-linen absolute left-0"></div><div class="bg-white px-3 text-[10px] font-bold text-estim-walnut uppercase tracking-wider z-10">Pause Déjeuner</div>`;
    container.appendChild(lunch);
  }
}

// --- 6. UTILITAIRES ---
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
  document.position = "bottom";
  document.body.appendChild(toast);
  return toast.present();
};