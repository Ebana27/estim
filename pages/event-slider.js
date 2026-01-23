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

// Variable pour tracker le slide actuel
let currentSlide = 0;

// Fonction pour afficher les événements dans la page
function displayEvents(events) {
    const container = document.getElementById('events-container');

    if (!container) {
        console.error('Conteneur events-container introuvable');
        return;
    }

    // Vider le conteneur
    container.innerHTML = '';

    // Créer le wrapper du slider
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'events-slider-wrapper';

    // Créer le slider
    const slider = document.createElement('div');
    slider.className = 'events-slider';
    slider.id = 'events-slider';

    // Ajouter les slides
    events.forEach((event, index) => {
        const slide = document.createElement('div');
        slide.className = 'event-slide';
        if (index === 0) slide.classList.add('active');

        const imageUrl = eventImages[index % eventImages.length];

        slide.innerHTML = `
            <div class="event-card">
                <div class="event-card-image" style="background-image: url('${imageUrl}')"></div>
                <div class="event-card-content">
                    <h2 class="event-card-title">${event.title}</h2>
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
                    <button class="event-card-btn">En savoir plus</button>
                </div>
            </div>
        `;

        slider.appendChild(slide);
    });

    sliderWrapper.appendChild(slider);

    // Créer les contrôles du slider
    const controls = document.createElement('div');
    controls.className = 'slider-controls';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-btn slider-btn-prev';
    prevBtn.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
    prevBtn.onclick = () => slideEvent(-1, events.length);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-btn slider-btn-next';
    nextBtn.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
    nextBtn.onclick = () => slideEvent(1, events.length);

    const dots = document.createElement('div');
    dots.className = 'slider-dots';

    events.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index, events.length);
        dots.appendChild(dot);
    });

    controls.appendChild(prevBtn);
    controls.appendChild(dots);
    controls.appendChild(nextBtn);

    sliderWrapper.appendChild(controls);
    container.appendChild(sliderWrapper);
}

// Fonction pour naviguer dans le slider
function slideEvent(direction, length) {
    currentSlide = (currentSlide + direction + length) % length;
    updateSlider(length);
}

// Fonction pour aller à un slide spécifique
function goToSlide(index, length) {
    currentSlide = index;
    updateSlider(length);
}

// Fonction pour mettre à jour le slider
function updateSlider(length) {
    const slides = document.querySelectorAll('.event-slide');
    const dots = document.querySelectorAll('.slider-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Exporter la fonction d'initialisation pour main.js
export function initEventPage() {
    console.log('Initialisation de la page événement');
    // Charger les événements après que le HTML soit injecté
    loadEvents();
}
