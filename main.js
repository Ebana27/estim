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

// Initialize Ionic
import("@ionic/core/loader");
import("@ionic/core/css/ionic.bundle.css");
import { defineCustomElements } from "@ionic/core/loader";
import { addIcons } from "ionicons";
import {
  home,
  homeOutline,
  apps,
  appsOutline,
  calendar,
  calendarOutline,
  megaphone,
  megaphoneOutline,
  library,
  libraryOutline,
  people,
  peopleOutline,
  notifications,
  notificationsOutline,
  arrowForward,
  arrowForwardOutline,
  arrowBack,
  options,
  optionsOutline,
  funnel,
  funnelOutline,
  search,
  searchOutline,
  location,
  locationOutline,
  person,
  personOutline,
  informationCircle,
  informationCircleOutline,
  pricetag,
  pricetagOutline,
  cash,
  cashOutline,
  reload,
  chevronBack,
  chevronForward,
  backspaceOutline,
} from "ionicons/icons";

// Register all icons used in the application
addIcons({
  home,
  "home-outline": homeOutline,
  apps,
  "apps-outline": appsOutline,
  calendar,
  "calendar-outline": calendarOutline,
  megaphone,
  "megaphone-outline": megaphoneOutline,
  library,
  "library-outline": libraryOutline,
  people,
  "people-outline": peopleOutline,
  notifications,
  "notifications-outline": notificationsOutline,
  "arrow-forward": arrowForward,
  "arrow-forward-outline": arrowForwardOutline,
  "arrow-back": arrowBack,
  options,
  "options-outline": optionsOutline,
  funnel,
  "funnel-outline": funnelOutline,
  search,
  "search-outline": searchOutline,
  location,
  "location-outline": locationOutline,
  person,
  "person-outline": personOutline,
  "information-circle": informationCircle,
  "information-circle-outline": informationCircleOutline,
  pricetag,
  "pricetag-outline": pricetagOutline,
  cash,
  "cash-outline": cashOutline,
  reload,
  "chevron-back": chevronBack,
  "chevron-forward": chevronForward,
});

defineCustomElements(window);

async function loadPage(path, name) {
  const res = await fetch(path);
  let html = await res.text();

  // Parser le HTML pour extraire le contenu du body
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const ionApp = doc.querySelector("ion-app");
  const bodyContent = ionApp ? ionApp.innerHTML : doc.body.innerHTML;

  // Charger la navbar et l'ajouter à la fin
  const navbarRes = await fetch("components/navbar.html");
  const navbarHtml = await navbarRes.text();

  // Insérer la navbar à la fin du contenu
  const finalHtml = bodyContent + navbarHtml;

  if (!customElements.get(name)) {
    customElements.define(
      name,
      class extends HTMLElement {
        connectedCallback() {
          this.innerHTML = finalHtml;

          // Charger et exécuter le script JS associé si disponible
          if (path.includes("pages/home.html")) {
            import("./pages/home.js")
              .then((module) => {
                if (module.initHomePage) {
                  module.initHomePage();
                }
              })
              .catch((err) => {
                console.error(
                  "Erreur lors du chargement du script: ./pages/home.js",
                  err,
                );
              });
          } else if (path.includes("pages/event.html")) {
            import("./pages/event.js")
              .then((module) => {
                if (module.initEventPage) {
                  module.initEventPage();
                }
              })
              .catch((err) => {
                console.error(
                  "Erreur lors du chargement du script: ./pages/event.js",
                  err,
                );
              });
          } else if (path.includes("pages/plan.html")) {
            import("./pages/plan.js")
              .then((module) => {
                if (module.initPlanPage) {
                  module.initPlanPage();
                }
              })
              .catch((err) => {
                console.error(
                  "Erreur lors du chargement du script: ./pages/plan.js",
                  err,
                );
              });
          } else if (path.includes("pages/catg.html")) {
            import("./pages/catg.js")
              .then((module) => {
                if (module.initCatgPage) {
                  module.initCatgPage();
                }
              })
              .catch((err) => {
                console.error(
                  "Erreur lors du chargement du script: ./pages/catg.js",
                  err,
                );
              });
          }
        }
      },
    );
  }
}

// Show a toast notification about the update
function showToast({ message, button, onClick }) {
  // Create toast element
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    max-width: 90%;
  `;

  // Create message element
  const messageEl = document.createElement("span");
  messageEl.textContent = message;
  messageEl.style.marginRight = "15px";

  // Create button element
  const buttonEl = document.createElement("button");
  buttonEl.textContent = button;
  buttonEl.style.backgroundColor = "#4CAF50";
  buttonEl.style.color = "white";
  buttonEl.style.border = "none";
  buttonEl.style.padding = "8px 16px";
  buttonEl.style.borderRadius = "4px";
  buttonEl.style.cursor = "pointer";
  buttonEl.onclick = () => {
    onClick();
    document.body.removeChild(toast);
  };

  // Add elements to toast
  toast.appendChild(messageEl);
  toast.appendChild(buttonEl);

  // Add toast to document
  document.body.appendChild(toast);

  // Auto-remove after 10 seconds if not clicked
  setTimeout(() => {
    if (toast.parentNode) {
      document.body.removeChild(toast);
    }
  }, 10000);
}

// Check for updates
async function checkUpdate() {
  try {
    // Get current version from the version.json file
    const currentVersionResponse = await fetch("./version.json");
    const currentVersionData = await currentVersionResponse.json();
    const CURRENT_VERSION = currentVersionData.version;

    // Determine if we're in development or production
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isDevelopment) {
      // Skip update check in development
      console.log("Skipping update check in development mode");
      return null;
    }

    // Replace with your actual Netlify URL for production
    const UPDATE_URL = "https://estim-update-xyz.netlify.app/version.json";

    // Attempt to fetch update info with a timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(UPDATE_URL, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const remote = await res.json();

    if (remote.version !== CURRENT_VERSION) {
      return remote;
    }
    return null;
  } catch (e) {
    // Handle different types of errors appropriately
    if (e.name === "AbortError") {
      console.warn("Update check timed out");
    } else if (e.name === "TypeError" && e.message.includes("fetch")) {
      console.warn(
        "Network error during update check (likely CORS in development):",
        e.message,
      );
    } else if (e.message.includes("404")) {
      console.warn("Update server not found (404), skipping update check");
    } else {
      console.warn("Update check failed:", e.message);
    }
    // In development or if there's a network/CORS issue, skip update check
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Check for updates
  const update = await checkUpdate();

  // Check if we've already notified about this specific version
  const notifiedVersion = localStorage.getItem("notifiedUpdateVersion");

  if (update && update.version !== notifiedVersion) {
    console.log("Update dispo 👀", update.message);

    // Store the notified version to prevent repeated notifications
    localStorage.setItem("notifiedUpdateVersion", update.version);

    // Show a toast notification about the update
    showToast({
      message: update.message || "Nouvelle version disponible",
      button: "Mettre à jour",
      onClick: () => {
        // Clear the notified version when updating so we can notify again if needed
        localStorage.removeItem("notifiedUpdateVersion");
        window.location.reload();
      },
    });

    // Alternative: Simple reload after delay
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1500);
  }

  await loadPage("pages/home.html", "page-home");
  await loadPage("pages/event.html", "page-event");
  await loadPage("pages/plan.html", "page-plan");
  await loadPage("pages/catg.html", "page-catg");

  // Fonction pour rendre la page actuelle
  async function renderCurrentPage() {
    const currentPath = window.location.pathname;
    let pageName = "page-home"; // default

    if (currentPath.includes("/event")) {
      pageName = "page-event";
    } else if (currentPath.includes("/plan")) {
      pageName = "page-plan";
    } else if (currentPath.includes("/catg")) {
      pageName = "page-catg";
    }

    // Wait for ion-app to be available and for Ionic to be loaded
    let ionApp = document.querySelector("ion-app");
    let attempts = 0;
    const maxAttempts = 60; // 6 seconds max wait time (increased)

    while (!ionApp && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      ionApp = document.querySelector("ion-app");
      attempts++;

      // If we still can't find it, try getting it from the document body
      if (!ionApp && document.body) {
        ionApp = document.body.querySelector("ion-app");
      }
    }

    if (!ionApp) {
      console.error("Failed to find ion-app element after waiting");
      // Try to find ion-app in the document more thoroughly
      const allIonApps = document.querySelectorAll("ion-app");
      if (allIonApps.length > 0) {
        ionApp = allIonApps[0];
      } else {
        // Last resort: create ion-app if it doesn't exist
        console.warn("Creating ion-app element dynamically");
        const newIonApp = document.createElement("ion-app");
        if (document.body) {
          document.body.appendChild(newIonApp);
          ionApp = newIonApp;
        } else {
          console.error("Cannot create ion-app: document.body not available");
          return;
        }
      }
    }

    // Supprimer la page actuelle
    const currentPage = ionApp.querySelector(
      "page-home, page-event, page-plan, page-catg",
    );
    if (currentPage) {
      currentPage.remove();
    }

    // Ajouter la nouvelle page
    const newPage = document.createElement(pageName);
    ionApp.appendChild(newPage);
  }

  // Rendre la page initiale
  await renderCurrentPage(); // Await the async function

  // Fonction pour mettre à jour la navbar active
  function updateActiveNav() {
    const currentPath = window.location.pathname;

    // Reset all icons to outline
    const homeIcon = document.querySelector("#home-btn ion-icon");
    const profileIcon = document.querySelector("#profile-btn ion-icon");
    const eventsIcon = document.querySelector("#events-btn ion-icon");

    if (homeIcon) homeIcon.setAttribute("name", "home-outline");
    if (profileIcon) profileIcon.setAttribute("name", "apps-outline");
    if (eventsIcon) eventsIcon.setAttribute("name", "calendar-outline");

    // Remove active colors - check if elements exist before manipulating
    const navItems = document.querySelectorAll(".nav-item");
    if (navItems.length > 0) {
      navItems.forEach((link) => {
        link.classList.remove("text-estim-green");
        link.classList.add("text-estim-walnut");
      });
    }

    // Set active based on current path
    if (currentPath === "/" || currentPath === "/index.html") {
      if (homeIcon) homeIcon.setAttribute("name", "home");
      const homeBtn = document.getElementById("home-btn");
      if (homeBtn) {
        homeBtn.classList.remove("text-estim-walnut");
        homeBtn.classList.add("text-estim-green");
      }
    } else if (currentPath.includes("/catg")) {
      if (profileIcon) profileIcon.setAttribute("name", "apps");
      const profileBtn = document.getElementById("profile-btn");
      if (profileBtn) {
        profileBtn.classList.remove("text-estim-walnut");
        profileBtn.classList.add("text-estim-green");
      }
    } else if (
      currentPath.includes("/event") ||
      currentPath.includes("/plan")
    ) {
      if (eventsIcon) eventsIcon.setAttribute("name", "calendar");
      const eventsBtn = document.getElementById("events-btn");
      if (eventsBtn) {
        eventsBtn.classList.remove("text-estim-walnut");
        eventsBtn.classList.add("text-estim-green");
      }
    }
  }

  // Mettre à jour la navbar au chargement initial
  updateActiveNav();

  document.body.addEventListener("click", async (ev) => {
    // Make the click handler async
    const el = ev.target.closest("[router-link]");
    if (!el) return;
    ev.preventDefault();
    const path = el.getAttribute("router-link") || el.getAttribute("href");
    if (!path) return;
    history.pushState({}, "", path);
    await renderCurrentPage(); // Await the async function
    updateActiveNav();
    window.dispatchEvent(new PopStateEvent("popstate"));
  });

  // Écouter les changements d'URL pour mettre à jour la navbar
  window.addEventListener("popstate", async () => {
    // Make the popstate handler async
    await renderCurrentPage(); // Await the async function
    updateActiveNav();
  });
});

async function btnInteraction(varInt, varNotInt1, varNotInt2) {
  // varInt : Variable d'interaction
  let a = await varInt;
  let b = await varNotInt1;
  let c = await varNotInt2;

  if (!a || !b || !c) console.error("Interaction non disponible !");
  else {
    console.log("Interaction disponible");

    a.addEventListener("click", () => {
      a.classList.add("estim-active-btn");
      b.classList.remove("estim-active-btn")
      c.classList.remove("estim-active-btn")
    });
  }
}

export { btnInteraction };
export { loadPage };
