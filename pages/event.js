// --- event.js ---

let rawData = null;
let featuredData = null;

// --- 0. APPEL API ---
async function callApi() {
  const apiUrl = "http://localhost:5500/api/events";
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      console.log("Données Événements reçues !");
      rawData = await response.json();

      // Séparer l'élément vedette de la liste si nécessaire (optionnel, ou tu peux gérer ça dans le HTML direct)
      // Ici on suppose que l'API renvoie tout et que le HTML gère le premier item comme featured ou qu'on a une propriété isFeatured
      // Pour simplifier, on passe tout à displayEvents
      displayEvents(rawData);
    } else {
      console.error("Erreur API, statut:", response.status);
    }
  } catch (error) {
    console.error("Erreur fetch:", error);
    const container = document.getElementById('events-container');
    if (container) {
        container.innerHTML = '<p class="text-red-500 text-center p-4">Erreur de connexion au serveur.</p>';
    }
  }
}

// --- INITIALISATION ---
// IMPORTANT : On exporte pour main.js
export async function initEventPage() {
  console.log("Initialisation de la page Événements...");

  // 1. Attendre les données
  await callApi();

  // 2. Initialiser les écouteurs d'événements pour les filtres (si tu en as ajoutés dans le HTML)
  initFilters();
}

function initFilters() {
    // Logique si tu as des boutons de filtre dans le HTML
}

// --- RENDU DE LA LISTE ---
function displayEvents(events) {
    const listContainer = document.getElementById('events-list-container');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    // Filtrer pour ne pas afficher l'élément "Vedette" dans la liste (optionnel)
    // Admettons que l'API renvoie une liste, on affiche tout sauf si c'est le featured
    const listItems = events; // Adapte selon ta logique de featured

    listItems.forEach(event => {
        const card = document.createElement('div');
        card.className = "estim-event-card w-full h-28 overflow-hidden relative cursor-pointer transition-transform active:scale-[0.98]";

        card.innerHTML = `
            <div class="flex h-full w-full">
                <!-- Bloc Date (Gauche) -->
                <div class="w-20 h-28 bg-gradient-to-br ${event.gradient || 'from-gray-400 to-gray-500'} flex flex-col justify-center items-center shrink-0 text-white">
                    <span class="text-xs font-medium mb-1">${event.day || 'MAR'}</span>
                    <span class="text-xl font-bold">${event.dayNum || '15'}</span>
                </div>

                <!-- Contenu (Droite) -->
                <div class="flex-1 p-4 flex flex-col justify-between relative">
                    <div>
                        <h4 class="text-base font-semibold text-gray-900 mb-1 leading-tight">${event.title}</h4>
                        <p class="text-sm text-gray-600 leading-tight">${event.location}</p>
                    </div>

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

                <!-- Bouton Cœur -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                    <ion-icon name="heart-outline" class="text-gray-300 text-xl hover:text-red-400 transition-colors"></ion-icon>
                </div>
            </div>
        `;

        // Gestionnaire de clic pour ouvrir la modal (à définir si besoin)
        card.onclick = () => openEventModal(event);

        listContainer.appendChild(card);
    });
}

// --- MODALE SIMPLE (Optionnel) ---
window.openEventModal = function(event) {
    alert(`Détails pour : ${event.title}\n${event.description}`);
    // Tu peux réutiliser la logique de création de modal Ionic que tu avais avant si tu veux
};