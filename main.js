// ═══════════════════════════════════════════════════════════════════════════
// ROUTEUR SIMPLE - EXPLICATION LIGNE PAR LIGNE
// ═══════════════════════════════════════════════════════════════════════════
//
// loadPage(path, name)
// Charge un fichier HTML et le transforme en composant Web personnalisé
// @async
// @param {string} path - Chemin du fichier HTML (ex: 'pages/home.html')
// @param {string} name - Nom du composant (ex: 'page-home')
//
// fetch(path) envoie une requête au serveur pour récupérer le fichier
// res.text() convertit le fichier en texte lisible
// customElements.get(name) cherche si le composant est enregistré
// customElements.define() crée une nouvelle balise HTML personnalisée
// connectedCallback() fonction appelée quand l'élément est ajouté à la page
// this.innerHTML remplit l'élément avec le HTML chargé
//
// ═══════════════════════════════════════════════════════════════════════════
// INITIALISATION QUAND LA PAGE SE CHARGE
// ═══════════════════════════════════════════════════════════════════════════
//
// DOMContentLoaded événement qui se déclenche quand la page HTML est prête
// Charger les 3 pages HTML et les enregistrer comme composants
//
// GÉRER LES CLICS SUR LES LIENS DE NAVIGATION
// click événement déclenché quand on clique n'importe où
// ev.target.closest('[router-link]') remonte l'arbre pour trouver un ancêtre
// ev.preventDefault() empêche le comportement par défaut du lien
// el.getAttribute() lit la valeur d'un attribut
// history.pushState() change l'URL sans recharger la page
// window.dispatchEvent() déclenche un événement 'popstate'
//
// ═══════════════════════════════════════════════════════════════════════════

async function loadPage(path, name) {
    const res = await fetch(path);
    const html = await res.text();

    if (!customElements.get(name)) {
        customElements.define(name, class extends HTMLElement {
            connectedCallback() {
                this.innerHTML = html;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPage('pages/home.html', 'page-home');
    await loadPage('pages/event.html', 'page-event');
    await loadPage('pages/plan.html', 'page-plan');
    await loadPage('pages/catg.html', 'page-catg');

    document.body.addEventListener('click', (ev) => {
        const el = ev.target.closest('[router-link]');
        if (!el) return;
        ev.preventDefault();
        const path = el.getAttribute('router-link') || el.getAttribute('href');
        if (!path) return;
        history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    });
});

export { loadPage };
