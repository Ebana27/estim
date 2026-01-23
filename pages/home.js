// pages/home.js - Logique pour la page d'accueil

// Données des sliders (chargées depuis l'API ou avec fallback local)
let slidersData = [];

// Fonction pour charger les sliders depuis l'API
async function loadSlidersFromAPI() {
    try {
        // Essayons d'abord de charger depuis une API locale si disponible
        const response = await fetch('/data/sliders.json');

        if (response.ok) {
            const data = await response.json();
            if (data.sliders && data.sliders.length > 0) {
                slidersData = data.sliders;
            } else {
                // Fallback vers des images par défaut
                slidersData = getDefaultSliders();
            }
        } else {
            // Si l'API locale n'existe pas, utiliser les données par défaut
            slidersData = getDefaultSliders();
        }
    } catch (error) {
        console.error('Erreur lors du chargement des sliders:', error);
        // Fallback vers des images par défaut
        slidersData = getDefaultSliders();
    }
}

// Fonction utilitaire pour obtenir les données de secours
function getDefaultSliders() {
    return [
        { id: 1, imageUrl: '/public/image.png', title: 'Rentrée 2026' },
        { id: 2, imageUrl: '/public/calendar.png', title: 'Emploi du Temps' },
        { id: 3, imageUrl: '/public/event.png', title: 'Événements' }
    ];
}

// Fonction pour initialiser le slider avec les données chargées
function initSlider() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer || slidersData.length === 0) return;

    // Créer les slides dynamiquement
    const slidesHTML = slidersData.map((slide, index) => `
        <div class="snap-center shrink-0 w-[85vw] h-[220px] bg-gradient-to-br from-[#34a003] to-[#ffcf32] rounded-[2rem] relative overflow-hidden shadow-lg shadow-green-900/10 flex items-center select-none ${index === 0 ? 'active' : ''}">
            <div class="absolute right-0 top-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div class="pl-6 z-10 text-white w-2/3">
                <h2 class="text-2xl font-bold leading-tight mb-1">
                    ${slide.title}
                </h2>
                <p class="text-sm opacity-90 mb-3 leading-relaxed">
                    Découvrez les dernières actualités de l'ESTIM.
                </p>
                <ion-button class="btn-estim">
                    En savoir plus
                    <ion-icon slot="end" name="arrow-forward-outline"></ion-icon>
                </ion-button>
            </div>

            <div class="absolute -right-6 bottom-[-20px] w-40 h-40 bg-yellow-200 rounded-full mix-blend-overlay opacity-60 blur-md">
            </div>
        </div>
    `).join('');

    sliderContainer.innerHTML = slidesHTML;

    // Créer les indicateurs (dots)
    const dotsContainer = sliderContainer.parentElement.querySelector('.flex.justify-center.gap-1\\.5');
    if (dotsContainer) {
        const dotsHTML = slidersData.map((_, index) => `
            <div class="w-${index === 0 ? '6' : '1.5'} h-1.5 rounded-full ${index === 0 ? 'bg-estim-green' : 'bg-gray-400'} transition-all"></div>
        `).join('');
        dotsContainer.innerHTML = dotsHTML;
    }
}

// Fonction d'initialisation de la page d'accueil
export async function initHomePage() {
    // Charger les sliders depuis l'API
    await loadSlidersFromAPI();

    // Initialiser le slider avec les données chargées
    initSlider();

    // Interaction simple sur les boutons "Default" (Feedback visuel)
    document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Default')) {
            btn.addEventListener('click', () => {
                window.presentToast('Action par défaut exécutée');
            });
        }
    });

    // Gestion du scroll vers les sections
    window.scrollToSection = function (id) {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            const menu = document.querySelector('ion-menu');
            if (menu) menu.close();
        }
    };

    // Fonction pour afficher les toasts
    window.presentToast = async function (message) {
        const toast = document.createElement('ion-toast');
        toast.message = message;
        toast.duration = 2000;
        toast.position = 'bottom';
        toast.color = 'dark';
        toast.cssClass = 'toast-custom';
        document.body.appendChild(toast);
        await toast.present();
    };

    // Gestion des notifications
    window.showNotifications = function () {
        window.presentToast('Bientôt disponibles 🚀');
    };

    // Gestion des notifications
    const notifElement = document.getElementById('notif');
    if (notifElement) {
        notifElement.addEventListener('click', () => {
            showNotifications();
        });
        console.log('Notif Dom Load');
    } else {
        console.warn('Notif element not found - notifications may not work');
    }

    // Gestion simple du slider auto-scroll
    const slider = document.getElementById('hero-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Fonction pour mettre à jour les dots
        const updateDots = () => {
            const dotsContainer = slider.parentElement.querySelector('.flex.justify-center.gap-1\\.5');
            if (!dotsContainer) return;
            
            const dots = dotsContainer.querySelectorAll('div[class*="h-1.5"]');
            const scrollPosition = slider.scrollLeft;
            const slideWidth = slider.firstChild ? slider.firstChild.offsetWidth : 0;
            const currentIndex = Math.round(scrollPosition / slideWidth);

            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.className = 'w-6 h-1.5 rounded-full bg-estim-green transition-all';
                } else {
                    dot.className = 'w-1.5 h-1.5 rounded-full bg-gray-400 transition-all';
                }
            });
        };

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Mettre à jour les dots lors du scroll
        slider.addEventListener('scroll', updateDots);
        slider.addEventListener('touchend', updateDots);
    }

    // Gestion de l'état actif pour la navigation inférieure
    const navButtons = document.querySelectorAll('#home-btn, #events-btn, #calendar-btn, #catalogue-btn');

    // Fonction pour retirer la classe active de tous les boutons
    function removeActiveClass() {
        navButtons.forEach(button => {
            button.classList.remove('text-estim-green');
            button.classList.add('text-gray-400');
        });
    }

    // Ajouter un gestionnaire de clic à chaque bouton de navigation
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            removeActiveClass();
            this.classList.add('text-estim-green');
            this.classList.remove('text-gray-400');
        });
    });

    // Par défaut, le bouton d'accueil est actif
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.classList.add('text-estim-green');
        homeBtn.classList.remove('text-gray-400');
    }
}
