// Données mixtes : Événements et Annonces officielles
const announcements = [
  {
    id: 1,
    title: "Concert Rock",
    location: "Stade de France",
    date: "18 Mars 2024",
    day: "MAR",
    dayNum: 18,
    price: "€45",
    participants: "1.2k participants",
    type: "Concert",
    gradient: "from-orange-400 to-red-500",
    description: "Une soirée explosive avec les plus grands groupes de rock français et internationaux.",
    isFeatured: false
  },
  {
    id: 2,
    title: "Exposition d'Art",
    location: "Musée d'Orsay",
    date: "22 Mars 2024",
    day: "MAR",
    dayNum: 22,
    price: "€20",
    participants: "850 participants",
    type: "Art",
    gradient: "from-green-400 to-blue-500",
    description: "Découvrez une collection inédite d'œuvres impressionnistes.",
    isFeatured: false
  },
  {
    id: 3,
    title: "Festival Gastronomique",
    location: "Place Vendôme",
    date: "25 Mars 2024",
    day: "MAR",
    dayNum: 25,
    price: "€35",
    participants: "2.1k participants",
    type: "Food",
    gradient: "from-purple-400 to-pink-500",
    description: "Dégustation de produits du terroir et démonstrations de chefs étoilés.",
    isFeatured: false
  },
  {
    id: 4,
    title: "Absence Prof. Martin",
    location: "Salle A204",
    date: "26 Mars 2024",
    day: "MAR",
    dayNum: 26,
    price: null,
    participants: null,
    type: "Annonce",
    gradient: "from-gray-500 to-gray-600", // Gris pour annonce officielle
    description: "Le cours d'algorithmique est annulé. Veuillez consulter la liste des rattrapages ci-jointe.",
    fileUrl: "/pdf/absence_martin.pdf", // Simulation fichier téléchargeable
    isFeatured: false
  }
];

const featuredData = {
    title: "Festival de Jazz",
    location: "Paris",
    date: "15 Mars 2024",
    description: "Concert exceptionnel avec les plus grands artistes internationaux. Préparez-vous pour trois jours de musique pure au cœur de la capitale.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=800&q=80"
};

// --- INITIALISATION ---
export function initEventPage() {
    renderEventsList(announcements);
}

// --- RENDU DE LA LISTE ---
function renderEventsList(events) {
    const container = document.getElementById('events-list-container');
    if (!container) return;
    container.innerHTML = '';

    events.forEach(event => {
        const card = document.createElement('div');
        card.className = "estim-event-card w-full h-28 overflow-hidden relative cursor-pointer transition-transform active:scale-[0.98]";

        // Layout basé sur le prototype
        card.innerHTML = `
            <div class="flex h-full w-full">
                <!-- Bloc Date (Gauche) -->
                <div class="w-20 h-28 bg-gradient-to-br ${event.gradient} flex flex-col justify-center items-center shrink-0 text-white">
                    <span class="text-xs font-medium mb-1">${event.day}</span>
                    <span class="text-xl font-bold">${event.dayNum}</span>
                </div>

                <!-- Contenu (Droite) -->
                <div class="flex-1 p-4 flex flex-col justify-between relative">
                    <!-- Titre & Lieu -->
                    <div>
                        <h4 class="text-base font-semibold text-gray-900 mb-1 leading-tight">${event.title}</h4>
                        <p class="text-sm text-gray-600 leading-tight">${event.location}</p>
                    </div>

                    <!-- Prix / Participants / Badge -->
                    <div class="flex justify-between items-center mt-2">
                        ${event.price ? `
                            <span class="text-indigo-500 font-semibold text-base">${event.price}</span>
                        ` : '<span class="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">ANNULÉ</span>'}

                        ${event.participants ? `
                            <div class="flex items-center text-xs text-gray-500">
                                <ion-icon name="people-outline" class="text-gray-400 text-xs mr-1"></ion-icon>
                                ${event.participants}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Bouton Cœur (Droite absolue) -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                    <ion-icon name="heart-outline" class="text-gray-300 text-xl hover:text-red-400 transition-colors"></ion-icon>
                </div>
            </div>
        `;

        // Gestionnaire de clic pour ouvrir la modal
        card.onclick = () => openEventModal(event);

        container.appendChild(card);
    });
}

// --- GESTION DES FILTRES (Visuel) ---
window.filterEvents = function(category) {
    // Mettre à jour l'état visuel des boutons
    const buttons = document.querySelectorAll('.estim-chip');
    buttons.forEach(btn => {
        const text = btn.innerText.trim();
        if (text === category) {
            btn.className = "estim-chip estim-chip-active flex items-center gap-2 px-4";
        } else {
            btn.className = "estim-chip estim-chip-inactive flex items-center gap-2 px-4";
        }
    });

    // Filtrage simple (logique à adapter selon vos besoins)
    if (category === 'Populaires') {
        renderEventsList(announcements); // Affiche tout
    } else {
        const filtered = announcements.filter(e => e.type === category);
        renderEventsList(filtered);
    }
};

// --- MODALE VEDETTE (Spécifique) ---
window.openFeaturedModal = function() {
    createAndPresentModal({
        ...featuredData,
        isFeatured: true,
        price: "€120",
        actionType: "book" // Bouton Réserver
    });
};

// --- MODALE GÉNÉRIQUE ---
window.openEventModal = function(event) {
    createAndPresentModal({
        ...event,
        actionType: event.fileUrl ? "download" : "book" // Télécharger PDF si fichier existe
    });
};

function createAndPresentModal(event) {
    const modal = document.createElement('ion-modal');
    modal.initialBreakpoint = 0.75;
    modal.breakpoints = [0, 0.75, 1];
    modal.component = 'event-detail-component';
    modal.swipeToClose = true;
    modal.componentProps = { event }; // Passer les données au composant

    if (!customElements.get('event-detail-component')) {
        customElements.define('event-detail-component', class extends HTMLElement {
            connectedCallback() {
                const event = this.componentProps?.event || {};

                // Bouton d'action conditionnel
                let actionButtonHTML = '';
                if (event.fileUrl) {
                    // Annonce / Fichier PDF
                    actionButtonHTML = `
                        <ion-button href="${event.fileUrl}" download class="w-full h-12 mt-6 font-semibold" color="dark">
                            <ion-icon slot="start" name="download-outline"></ion-icon>
                            Télécharger le document
                        </ion-button>
                    `;
                } else if (event.price) {
                    // Événement payant / Réserver
                    actionButtonHTML = `
                        <ion-button class="w-full h-12 mt-6 font-semibold" style="--background: #4f46e5">
                            Réserver ma place
                        </ion-button>
                    `;
                } else {
                    // Simple participation
                    actionButtonHTML = `
                        <ion-button class="w-full h-12 mt-6 font-semibold" style="--background: #4f46e5">
                            Participer
                        </ion-button>
                    `;
                }

                this.innerHTML = `
                    <ion-header class="ion-no-border">
                        <ion-toolbar style="--background: transparent; --border-width: 0;">
                            <ion-buttons slot="end">
                                <ion-button onclick="dismissModal()">
                                    <ion-icon name="close-circle" style="font-size: 32px; color: #374151;"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content class="ion-padding bg-white">
                        <div class="h-48 rounded-2xl bg-gradient-to-br ${event.gradient || 'from-indigo-500 to-purple-500'} mb-6 flex items-center justify-center text-white shadow-lg">
                            ${event.isFeatured
                                ? '<h1 class="text-3xl font-bold drop-shadow-md">🎷 Jazz</h1>'
                                : `<span class="text-6xl font-bold opacity-50">${event.dayNum || 'XX'}</span>`
                            }
                        </div>

                        <h1 class="text-2xl font-bold text-gray-900 mb-2 font-inter">${event.title}</h1>

                        <div class="flex items-center gap-2 text-gray-500 mb-4 text-sm font-inter">
                            <ion-icon name="calendar-outline"></ion-icon>
                            <span>${event.date}</span>
                            <span class="mx-1">•</span>
                            <ion-icon name="location-outline"></ion-icon>
                            <span>${event.location}</span>
                        </div>

                        <div class="text-gray-600 leading-relaxed text-sm font-inter mb-6">
                            ${event.description}
                        </div>

                        ${actionButtonHTML}
                    </ion-content>
                `;
            }
        });
    }

    // Fonction locale pour fermer la modale
    window.dismissModal = function() {
        modal.dismiss();
    };

    document.body.appendChild(modal);
    modal.present();
}