// Fonction pour charger les données des événements
async function loadEvents() {
    try {
        // Utiliser le chemin absolu depuis la racine du serveur
        const response = await fetch('/data/events.json');

        if (!response.ok) {
            throw new Error(`Erreur lors du chargement des données: ${response.status}`);
        }

        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        const container = document.getElementById('events-container');
        if (container) {
            container.innerHTML = '<p style="color: #d41159; text-align: center; padding: 2rem;">Erreur lors du chargement des événements.</p>';
        }
    }
}

// Tableau d'images de placeholder pour les événements
const eventImages = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178f50002275?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=500&fit=crop'
];

// Fonction pour afficher les événements dans la page
function displayEvents(events) {
    const container = document.getElementById('events-container');

    if (!container) {
        console.error('Conteneur events-container introuvable');
        return;
    }

    // Vider le conteneur
    container.innerHTML = '';

    // Créer le contenu HTML pour chaque événement
    events.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';

        // Ajouter un gestionnaire de clic pour ouvrir la modal
        const eventId = `event-${event.id || index}`;
        const imageUrl = eventImages[index % eventImages.length];

        eventElement.innerHTML = `
            <div id="${eventId}" class="event-card-image" style="background-image: url('${imageUrl}'); cursor: pointer;" onclick="openEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})"></div>
            <div class="event-card-content">
                <h2 class="event-card-title" onclick="openEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})" style="cursor: pointer;">${event.title}</h2>
                <div class="event-card-meta">
                    <div class="event-meta-item">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-meta-item">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>${event.location}</span>
                    </div>
                </div>
                <p class="event-card-description">${event.description}</p>
                <button class="event-card-btn" onclick="openEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})">En savoir plus</button>
            </div>
        `;

        container.appendChild(eventElement);
    });
}

// Fonction pour ouvrir la modal avec les détails complets de l'événement
window.openEventModal = function(event) {
    // Créer la modal
    const modal = document.createElement('ion-modal');
    modal.cssClass = 'full-screen-modal';
    modal.component = 'event-detail-component';
    modal.swipeToClose = true;

    // Définir le composant pour les détails de l'événement
    if (!customElements.get('event-detail-component')) {
        customElements.define('event-detail-component', class extends HTMLElement {
            connectedCallback() {
                const imageUrl = eventImages[Math.floor(Math.random() * eventImages.length)];

                this.innerHTML = `
                    <ion-header>
                        <ion-toolbar color="light">
                            <ion-title>Détails de l'événement</ion-title>
                            <ion-buttons slot="end">
                                <ion-button onclick="document.querySelector('ion-modal').dismiss()">
                                    <ion-icon name="close"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content class="ion-padding">
                        <div class="event-detail-container">
                            <div class="event-detail-image" style="background-image: url('${imageUrl}'); height: 200px; background-size: cover; background-position: center; border-radius: 12px; margin-bottom: 20px;"></div>

                            <div class="event-detail-card">
                                <h2 class="event-detail-title">${event.title || 'Événement sans titre'}</h2>

                                <div class="event-detail-info">
                                    <div class="info-row">
                                        <ion-icon name="calendar-outline" class="info-icon"></ion-icon>
                                        <div>
                                            <div class="label">Date</div>
                                            <div class="value">${event.date || 'Non spécifiée'}</div>
                                        </div>
                                    </div>

                                    <div class="info-row">
                                        <ion-icon name="location-outline" class="info-icon"></ion-icon>
                                        <div>
                                            <div class="label">Lieu</div>
                                            <div class="value">${event.location || 'Non spécifié'}</div>
                                        </div>
                                    </div>

                                    <div class="info-row full-width">
                                        <ion-icon name="information-circle-outline" class="info-icon"></ion-icon>
                                        <div>
                                            <div class="label">Description</div>
                                            <div class="value">${event.description || 'Aucune description disponible'}</div>
                                        </div>
                                    </div>

                                    ${event.organizer ? `
                                    <div class="info-row">
                                        <ion-icon name="people-outline" class="info-icon"></ion-icon>
                                        <div>
                                            <div class="label">Organisateur</div>
                                            <div class="value">${event.organizer}</div>
                                        </div>
                                    </div>
                                    ` : ''}

                                    ${event.category ? `
                                    <div class="info-row">
                                        <ion-icon name="pricetag-outline" class="info-icon"></ion-icon>
                                        <div>
                                            <div class="label">Catégorie</div>
                                            <div class="value">${event.category}</div>
                                        </div>
                                    </div>
                                    ` : ''}

                                    ${event.price ? `
                                    <div class="info-row">
                                        <ion-icon name="cash-outline" class="info-icon"></ion-icon>
                                        <div>
                                            <div class="label">Prix</div>
                                            <div class="value">${event.price}</div>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </ion-content>

                    <style>
                        .event-detail-container {
                            padding: 20px 0;
                        }

                        .event-detail-card {
                            background: white;
                            border-radius: 16px;
                            padding: 24px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                        }

                        .event-detail-title {
                            font-size: 24px;
                            font-weight: bold;
                            color: #1f2937;
                            margin-bottom: 20px;
                        }

                        .event-detail-info {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 20px;
                        }

                        .info-row {
                            display: flex;
                            align-items: flex-start;
                            gap: 12px;
                        }

                        .info-row.full-width {
                            grid-column: 1 / -1;
                        }

                        .info-icon {
                            color: #6b7280;
                            font-size: 18px;
                            margin-top: 2px;
                        }

                        .label {
                            font-size: 12px;
                            color: #6b7280;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 4px;
                        }

                        .value {
                            font-weight: 500;
                            color: #1f2937;
                        }

                        .full-screen-modal {
                            --height: 100%;
                            --width: 100%;
                            --border-radius: 0;
                        }
                    </style>
                `;
            }
        });
    }

    // Ajouter la modal au corps du document et l'afficher
    document.body.appendChild(modal);
    modal.present();
};

// Exporter la fonction d'initialisation pour main.js
export function initEventPage() {
    console.log('Initialisation de la page événement');
    // Charger les événements après que le HTML soit injecté
    loadEvents();
}