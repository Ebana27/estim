// pages/catg.js - Logique pour la page Application

// Fonction d'initialisation de la page
export async function initCatgPage() {
  console.log('Page Application initialisée');
  
  // Initialiser les event listeners si nécessaire
  const buttons = document.querySelectorAll('ion-button[router-link]');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const link = btn.getAttribute('router-link');
      if (link) {
        e.preventDefault();
        window.location.href = link;
      }
    });
  });
}
