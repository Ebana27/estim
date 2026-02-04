// --- event.js ---

let rawData = null;
let debounceTimer; // Timer pour la recherche

// --- 0. APPEL API ---
async function callApi() {
  const apiUrl = "http://localhost:5500/api/events";

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      console.log("Données Événements reçues !");
      rawData = await response.json();
      displayEvents(rawData);
    } else {
      console.error("Erreur API, statut:", response.status);
      showError("Impossible de charger les événements (API Error).");
    }
  } catch (error) {
    console.error("Erreur fetch:", error);
    showError("Erreur de connexion au serveur. Vérifiez que le backend tourne.");
  }
}

function showError(msg) {
    const container = document.getElementById('events-list-container');
    if (container) {
        container.innerHTML = `
            <div class="text-center py-12 flex flex-col items-center">
                <ion-icon name="alert-circle-outline" class="text-4xl text-red-400 mb-2"></ion-icon>
                <p class="text-red-500 px-4">${msg}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold">Réessayer</button>
            </div>
        `;
    }
}

// --- INITIALISATION ---
export async function initEventPage() {
  console.log("Initialisation de la page Événements...");
  await callApi();
  initFilters();
}

// --- FILTRE DE RECHERCHE (AVEC DEBOUNCE) ---
function initFilters() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        // Annuler le timer précédent
        clearTimeout(debounceTimer);

        const term = e.target.value.toLowerCase().trim();

        // Attendre 300ms avant de lancer la recherche
        debounceTimer = setTimeout(() => {
            if (!rawData) return;

            const filtered = rawData.filter(event => {
                const title = (event.title || "").toLowerCase();
                const category = (event.category || "").toLowerCase();
                const location = (event.location || "").toLowerCase();
                const organizer = (event.organizer || "").toLowerCase();

                return title.includes(term) ||
                       category.includes(term) ||
                       location.includes(term) ||
                       organizer.includes(term);
            });

            displayEvents(filtered);
        }, 300);
    });
}

// --- UTILITAIRES ---

// Formate la date "2026-02-15" en { day: "FÉV", dayNum: 15 }
// Correction du bug de fuseau horaire en parsant manuellement la chaîne
function parseDateInfo(dateString) {
    if (!dateString) return { day: "???", dayNum: "?", year: "----" };

    // Sépare YYYY-MM-DD pour éviter le bug UTC (ex: 15 février devenant 14)
    const parts = dateString.split('-');
    if (parts.length !== 3) return { day: "ERR", dayNum: "?", year: "----" };

    const year = parseInt(parts[0]);
    const monthIndex = parseInt(parts[1]) - 1; // Mois JS commencent à 0
    const day = parseInt(parts[2]);

    // Créer l'objet date en forçant l'heure locale à midi pour éviter tout décalage
    const date = new Date(year, monthIndex, day, 12, 0, 0);

    const months = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUI", "JUI", "AOÛ", "SEP", "OCT", "NOV", "DÉC"];

    return {
        day: months[date.getMonth()] || "ERR",
        dayNum: date.getDate(),
        year: year
    };
}

// Retourne un dégradé CSS selon la catégorie
function getGradient(category) {
    const cat = (category || "").toLowerCase();
    const gradients = {
        "technologie": "estim-gradient-tech",
        "formation": "estim-gradient-formation",
        "réseau": "estim-gradient-reseau",
        "conférence": "estim-gradient-conference",
        "default": "estim-gradient-default"
    };

    const foundKey = Object.keys(gradients).find(key => cat.includes(key));
    return gradients[foundKey] || gradients["default"];
}

function getEventImage(category) {
    const cat = (category || "").toLowerCase();
    const images = {
        "technologie": "/public/event.png",
        "formation": "/public/calendar.png",
        "réseau": "/public/annonce.png",
        "conference": "/public/image.png",
        "conférence": "/public/image.png",
        "default": "/public/event.png"
    };

    const foundKey = Object.keys(images).find(key => cat.includes(key));
    return images[foundKey] || images["default"];
}

function getBadgeInfo(event) {
    const type = (event.type || event.kind || "").toLowerCase();
    if (type.includes("annonce")) {
        return { label: "Annonce", className: "is-announcement" };
    }
    return { label: "Événement", className: "is-event" };
}

// --- RENDU DE LA LISTE ---
function displayEvents(events) {
    const listContainer = document.getElementById('events-list-container');
    if (!listContainer) return;

    // Si vide après recherche
    if (events.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-10 text-gray-400 flex flex-col items-center animate-pulse">
                <ion-icon name="search-outline" class="text-4xl mb-2"></ion-icon>
                <p>Aucun événement ne correspond.</p>
            </div>`;
        return;
    }

    listContainer.innerHTML = '';

    events.forEach(event => {
        const dateInfo = parseDateInfo(event.date);
        const gradientClass = getGradient(event.category);
        const imageUrl = getEventImage(event.category);
        const badgeInfo = getBadgeInfo(event);

        const card = document.createElement('div');
        card.className = "estim-event-card";

        card.innerHTML = `
            <div class="estim-event-card__media ${gradientClass}">
                <img src="${imageUrl}" alt="${event.title || "Événement"}" loading="lazy">
                <div class="estim-event-card__date">
                    <span>${dateInfo.day}</span>
                    <strong>${dateInfo.dayNum}</strong>
                </div>
                <div class="estim-event-card__badge ${badgeInfo.className}">
                    ${badgeInfo.label}
                </div>
            </div>

            <div class="estim-event-card__content">
                <h4 class="estim-event-card__title">${event.title || "Événement à venir"}</h4>

                <div class="estim-event-card__meta">
                    <div class="estim-event-card__meta-item">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>${event.location || "Lieu à confirmer"}</span>
                    </div>
                    <div class="estim-event-card__meta-item">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span>${dateInfo.day} ${dateInfo.dayNum} ${dateInfo.year}</span>
                    </div>
                </div>

                <p class="estim-event-card__excerpt">
                    ${event.description || "Plus d'informations disponibles dans la fiche de l'événement."}
                </p>

                <div class="estim-event-card__footer">
                    <span class="estim-event-card__price ${event.price === 'Gratuit' ? 'is-free' : 'is-paid'} ${badgeInfo.label === "Annonce" ? "is-hidden" : ""}">
                        ${badgeInfo.label === "Annonce" ? "" : (event.price || 'Prix ?')}
                    </span>
                    <button type="button" class="estim-event-card__cta" data-event-id="${event.id}">
                        Plus d'infos
                        <ion-icon name="chevron-forward"></ion-icon>
                    </button>
                </div>
            </div>
        `;

        const button = card.querySelector('.estim-event-card__cta');
        if (button) {
            button.onclick = (ev) => {
                ev.stopPropagation();
                window.openEventModal(event);
            };
        }
        listContainer.appendChild(card);
    });
}

// --- GESTION DE LA MODALE ---
window.openEventModal = function(event) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const dateInfo = parseDateInfo(event.date);
    const gradientClass = getGradient(event.category);
    const imageUrl = getEventImage(event.category);

    if (!modal || !modalContent) return;

    // 1. Préparer le contenu
    modalContent.innerHTML = `
        <button onclick="closeEventModal()" class="estim-modal__close" aria-label="Fermer la modale">
            <ion-icon name="close"></ion-icon>
        </button>

        <div class="estim-modal__hero ${gradientClass}">
            <img src="${imageUrl}" alt="${event.title || "Événement"}" loading="lazy">
            <div class="estim-modal__hero-text">
                <div class="estim-modal__hero-day">${dateInfo.dayNum}</div>
                <div class="estim-modal__hero-month">${dateInfo.day} ${dateInfo.year}</div>
            </div>
        </div>

        <div class="estim-modal__header">
            <span class="estim-modal__tag">${event.category || "INFO"}</span>
            <h2 class="estim-modal__title">${event.title}</h2>
        </div>

        <div class="estim-modal__details">
            <div class="estim-modal__detail">
                <ion-icon name="location"></ion-icon>
                <div>
                    <p class="estim-modal__label">Lieu</p>
                    <p class="estim-modal__value">${event.location || "Lieu à confirmer"}</p>
                </div>
            </div>
            <div class="estim-modal__detail">
                <ion-icon name="calendar"></ion-icon>
                <div>
                    <p class="estim-modal__label">Date</p>
                    <p class="estim-modal__value">${dateInfo.day} ${dateInfo.dayNum} ${dateInfo.year}</p>
                </div>
            </div>
            ${getBadgeInfo(event).label === "Événement" ? `
            <div class="estim-modal__detail">
                <ion-icon name="pricetag"></ion-icon>
                <div>
                    <p class="estim-modal__label">Tarif</p>
                    <p class="estim-modal__value">${event.price || "Tarif à confirmer"}</p>
                </div>
            </div>` : ``}
            <div class="estim-modal__detail">
                <ion-icon name="person-circle"></ion-icon>
                <div>
                    <p class="estim-modal__label">Organisateur</p>
                    <p class="estim-modal__value">${event.organizer || "Organisation ESTIM"}</p>
                </div>
            </div>
        </div>

        <div class="estim-modal__about">
            <h3>
                <ion-icon name="information-circle-outline"></ion-icon>
                À propos
            </h3>
            <p>${event.description || "Aucune description disponible."}</p>
        </div>

        <button class="estim-modal__action">
            <ion-icon name="calendar-check-outline"></ion-icon>
            Réserver ma place
        </button>
    `;

    // 2. Animation d'ouverture
    modal.classList.remove('hidden');

    // Petit délai pour laisser le DOM se rendre, puis on ouvre la feuille
    requestAnimationFrame(() => {
        modalContent.classList.add('is-open');
    });
};

window.closeEventModal = function() {
    const modal = document.getElementById('modal');
    if (!modal) return;

    // 1. Animation de sortie
    const content = modal.querySelector('#modal-content');
    content.classList.remove('is-open');

    // 2. Cacher et nettoyer après l'animation (300ms = durée de transition Tailwind)
    setTimeout(() => {
        modal.classList.add('hidden');
        content.innerHTML = '';
    }, 300);
};
