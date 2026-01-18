<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>ESTIM - Accueil</title>

  <!-- Ionic Framework (CSS & JS) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>

  <!-- Google Fonts: Poppins pour un look moderne et éducatif -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Phosphor Icons (pour des illustrations vectorielles modernes) -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <style>
    /* =========================================
       VARIABLES & RESET (Charte Graphique)
       ========================================= */
    :root {
      /* Palette demandée ESTIM */
      --green: #117a2aff;
      --black: #000100ff;
      --dark-walnut: #432204ff;
      --golden-pollen: #ffd036ff;
      --soft-linen: #d6dacbff;

      /* Additional modern colors */
      --light-gray: #f8f9fa;
      --white: #ffffff;
      --text-gray: #4a5568;
      
      /* UI Specifics */
      --radius-sm: 12px;
      --radius-md: 20px;
      --radius-lg: 30px;
      --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.05);
      --shadow-hover: 0 15px 35px rgba(17, 122, 42, 0.15); /* Tint of green */
      --font-main: 'Poppins', sans-serif;
    }

    body {
      font-family: var(--font-main);
      background-color: var(--light-gray);
      color: var(--black);
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    ion-app {
      background-color: var(--light-gray);
    }

    /* =========================================
       HEADER (Minimaliste & Centré)
       ========================================= */
    ion-toolbar {
      --background: var(--white);
      --border-width: 0;
      --padding-top: 10px;
      --padding-bottom: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
      height: 70px; /* Hauteur fixe pour l'élégance */
    }

    .custom-header-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .brand-container {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--black);
      letter-spacing: -0.5px;
    }
    
    .brand-icon {
      color: var(--green);
      font-size: 1.6rem;
    }

    /* Positionnement absolu des boutons latéraux */
    .header-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      --padding-start: 15px;
      --padding-end: 15px;
      --color: var(--black);
      font-size: 1.5rem;
    }
    .btn-start { left: 10px; }
    .btn-end { right: 10px; }

    /* =========================================
       MENU LATERAL (Overlay)
       ========================================= */
    ion-menu {
      --width: 280px;
    }

    ion-menu ion-content {
      --background: var(--white);
    }

    .menu-header {
      background-color: var(--soft-linen);
      padding: 40px 20px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .menu-logo-placeholder {
      width: 50px;
      height: 50px;
      background: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--green);
      font-size: 24px;
      font-weight: bold;
    }

    .menu-item-custom {
      --padding-start: 20px;
      --min-height: 60px;
      font-size: 1rem;
      font-weight: 500;
      --color: var(--black);
      --background-hover: var(--light-gray);
    }

    .menu-item-custom ion-icon {
      margin-right: 15px;
      color: var(--dark-walnut);
      font-size: 1.3rem;
    }

    /* =========================================
       HERO SECTION (Illustration)
       ========================================= */
    .hero-card {
      margin: 20px;
      padding: 30px 20px;
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-soft);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 6px;
      background: linear-gradient(90deg, var(--green), var(--golden-pollen));
    }

    .hero-illustration {
      width: 100%;
      max-width: 250px;
      height: auto;
      margin-bottom: 20px;
      border-radius: 10px;
    }

    .hero-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 10px 0;
      color: var(--dark-walnut);
    }

    .hero-subtitle {
      font-size: 0.95rem;
      color: var(--text-gray);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .cta-button {
      --background: var(--green);
      --box-shadow: 0 4px 15px rgba(17, 122, 42, 0.3);
      border-radius: 50px;
      height: 50px;
      font-weight: 600;
      text-transform: none;
    }

    /* =========================================
       SECTIONS GÉNÉRALES
       ========================================= */
    .section-title {
      padding: 0 25px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .section-title h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--black);
    }

    .section-title a {
      font-size: 0.85rem;
      color: var(--green);
      text-decoration: none;
      font-weight: 600;
    }

    /* =========================================
       CARDS ÉVÉNEMENTS
       ========================================= */
    .events-scroll {
      padding: 0 20px 20px;
      display: flex;
      overflow-x: auto;
      gap: 15px;
      scroll-snap-type: x mandatory;
      padding-bottom: 30px; /* Espace pour l'ombre */
    }

    .event-card {
      min-width: 260px;
      background: var(--white);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-soft);
      scroll-snap-align: center;
      position: relative;
    }

    .event-date-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background: var(--white);
      padding: 5px 10px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      z-index: 2;
    }

    .event-date-badge span {
      display: block;
      font-weight: 700;
      color: var(--green);
      font-size: 1.1rem;
      line-height: 1;
    }
    .event-date-badge small {
      color: var(--text-gray);
      font-size: 0.7rem;
      text-transform: uppercase;
    }

    .event-img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }

    .event-content {
      padding: 20px 15px;
    }

    .event-content h3 {
      margin: 0 0 8px 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.3;
    }

    .event-content p {
      margin: 0 0 15px 0;
      font-size: 0.85rem;
      color: var(--text-gray);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .event-tag {
      background-color: var(--soft-linen);
      color: var(--dark-walnut);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    /* =========================================
       SECTION EMPLOI DU TEMPS
       ========================================= */
    .schedule-container {
      margin: 0 20px 20px;
      background: var(--white);
      border-radius: var(--radius-md);
      padding: 20px;
      box-shadow: var(--shadow-soft);
    }

    .filter-row {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .custom-select {
      flex: 1;
      border: 1px solid var(--soft-linen);
      border-radius: 10px;
      padding: 0 10px;
      --padding-start: 10px;
      --padding-end: 10px;
      font-size: 0.9rem;
      color: var(--black);
    }

    .timetable-preview {
      display: none; /* Caché par défaut */
      animation: fadeIn 0.3s ease;
    }

    .timetable-preview.active {
      display: block;
    }

    .class-row {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--light-gray);
    }
    
    .class-row:last-child { border-bottom: none; }

    .time-col {
      width: 60px;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--green);
    }

    .info-col {
      flex: 1;
      padding-left: 10px;
    }

    .info-col h4 { margin: 0; font-size: 0.9rem; color: var(--black); }
    .info-col p { margin: 2px 0 0; font-size: 0.8rem; color: var(--text-gray); }

    /* =========================================
       BOTTOM NAV (Modern Style)
       ========================================= */
    .bottom-nav-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 350px;
      z-index: 100;
    }

    .nav-blur {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 50px;
      padding: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid rgba(255,255,255,0.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: var(--text-gray);
      width: 60px;
      height: 45px;
      border-radius: 35px;
      transition: all 0.3s ease;
    }

    .nav-item i {
      font-size: 1.4rem;
      margin-bottom: 2px;
      transition: transform 0.2s;
    }

    .nav-item span {
      font-size: 0.65rem;
      font-weight: 500;
    }

    .nav-item.active {
      background-color: var(--green);
      color: var(--white);
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(17, 122, 42, 0.3);
    }

    .nav-item:hover {
      color: var(--black);
    }
    .nav-item.active:hover {
      color: var(--white);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Responsive */
    @media (min-width: 768px) {
      .hero-card, .schedule-container {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .bottom-nav-container {
        width: 400px;
      }
    }
  </style>
</head>

<body>
  <ion-app>

    <!-- ==================== MENU LATERAL (Overlay) ==================== -->
    <ion-menu content-id="main-content" side="start" menu-id="first-menu">
      <ion-header>
        <div class="menu-header">
          <div class="menu-logo-placeholder">ES</div>
          <div>
            <h2 style="margin:0; font-size:1.2rem; color:var(--black);">ESTIM</h2>
            <p style="margin:0; font-size:0.8rem; color:var(--dark-walnut);">Ecole Supérieure</p>
          </div>
        </div>
      </ion-header>
      <ion-content>
        <ion-list lines="none">
          <ion-menu-toggle auto-hide="false">
            <ion-item class="menu-item-custom" button detail="false">
              <ion-icon slot="start" name="home-outline"></ion-icon>
              <ion-label>Accueil</ion-label>
            </ion-item>
            <ion-item class="menu-item-custom" button detail="false" onclick="scrollToSection('schedule')">
              <ion-icon slot="start" name="calendar-blank-outline"></ion-icon>
              <ion-label>Emploi du temps</ion-label>
            </ion-item>
            <ion-item class="menu-item-custom" button detail="false" onclick="scrollToSection('events')">
              <ion-icon slot="start" name="megaphone-outline"></ion-icon>
              <ion-label>Événements</ion-label>
            </ion-item>
            <ion-item class="menu-item-custom" button detail="false">
              <ion-icon slot="start" name="library-outline"></ion-icon>
              <ion-label>Bibliothèque</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
        
        <div style="padding: 20px; margin-top: 20px;">
          <p style="font-size:0.75rem; color:var(--text-gray); text-align:center;">Version 1.0.0 - ESTIM App</p>
        </div>
      </ion-content>
    </ion-menu>

    <!-- ==================== CONTENU PRINCIPAL ==================== -->
    <div class="ion-page" id="main-content">

      <!-- Header Centré ESTIM -->
      <ion-header class="ion-no-border">
        <ion-toolbar>
          <ion-buttons class="header-btn btn-start" slot="start">
            <ion-menu-button color="dark" style="font-size: 1.8rem;"></ion-menu-button>
          </ion-buttons>
          
          <div class="custom-header-content">
            <div class="brand-container">
              <i class="ph ph-graduation-cap brand-icon"></i>
              <span>ESTIM</span>
            </div>
          </div>

          <ion-buttons class="header-btn btn-end" slot="end">
            <ion-button color="dark" onclick="showNotifications()">
              <ion-icon slot="icon-only" name="notifications-outline" style="font-size: 1.5rem;-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen="true">
        
        <!-- 1. Hero Section -->
        <div class="hero-card">
          <!-- Illustration générique étudiant/école -->
          <img src="https://picsum.photos/seed/estimStudent/400/250" alt="Bienvenue" class="hero-illustration">
          <h1 class="hero-title">Bienvenue, Étudiant !</h1>
          <p class="hero-subtitle">Accédez à vos cours, restez informé des événements et gérez votre parcours à l'ESTIM.</p>
          <ion-button class="cta-button" expand="block" onclick="scrollToSection('schedule')">
            Voir mon emploi du temps
          </ion-button>
        </div>

        <!-- 2. Section Événements -->
        <div class="section-title">
          <h2>À la une</h2>
          <a href="#" onclick="presentToast('Afficher tous les événements')">Voir tout</a>
        </div>

        <div class="events-scroll" id="events">
          <!-- Event 1 -->
          <div class="event-card" onclick="presentEventDetails('Journée Portes Ouvertes')">
            <div class="event-date-badge">
              <span>15</span><small>NOV</small>
            </div>
            <img src="https://picsum.photos/seed/conference/300/150" class="event-img" alt="Event">
            <div class="event-content">
              <span class="event-tag">Événement</span>
              <h3>Journée Portes Ouvertes</h3>
              <p>Venez découvrir nos filières et parler aux enseignants.</p>
            </div>
          </div>

          <!-- Event 2 -->
          <div class="event-card" onclick="presentEventDetails('Hackathon ESTIM')">
            <div class="event-date-badge">
              <span>22</span><small>NOV</small>
            </div>
            <img src="https://picsum.photos/seed/tech/300/150" class="event-img" alt="Event">
            <div class="event-content">
              <span class="event-tag">Compétition</span>
              <h3>Hackathon Annuel</h3>
              <p>48h pour coder la solution de demain. Inscriptions ouvertes.</p>
            </div>
          </div>

          <!-- Event 3 -->
          <div class="event-card" onclick="presentEventDetails('Conférence IA')">
            <div class="event-date-badge">
              <span>05</span><small>DÉC</small>
            </div>
            <img src="https://picsum.photos/seed/ai/300/150" class="event-img" alt="Event">
            <div class="event-content">
              <span class="event-tag">Conférence</span>
              <h3>L'avenir de l'IA</h3>
              <p>Conférence par un expert invité sur l'intelligence artificielle.</p>
            </div>
          </div>
        </div>

        <!-- 3. Section Emploi du Temps -->
        <div class="section-title" id="schedule">
          <h2>Emploi du temps</h2>
        </div>

        <div class="schedule-container">
          <p style="margin:0 0 15px; font-size:0.9rem; color:var(--text-gray);">Sélectionnez votre filière pour afficher le planning :</p>
          
          <div class="filter-row">
            <ion-select class="custom-select" placeholder="Cycle" interface="popover" id="cycleSelect">
              <ion-select-option value="L3">Licence 3</ion-select-option>
              <ion-select-option value="M1">Master 1</ion-select-option>
              <ion-select-option value="M2">Master 2</ion-select-option>
            </ion-select>
            
            <ion-select class="custom-select" placeholder="Filière" interface="popover" id="filiereSelect" disabled>
              <ion-select-option value="GI">Génie Info.</ion-select-option>
              <ion-select-option value="GM">Génie Méca.</ion-select-option>
              <ion-select-option value="EG">Éco-Gestion</ion-select-option>
            </ion-select>
          </div>

          <!-- État vide initial -->
          <div id="emptyState" style="text-align:center; padding: 20px; color:var(--text-gray);">
            <i class="ph ph-calendar-x" style="font-size: 3rem; margin-bottom: 10px; opacity: 0.3;"></i>
            <p>Sélectionnez un cycle pour commencer.</p>
          </div>

          <!-- Preview statique (apparaît après sélection) -->
          <div id="timetablePreview" class="timetable-preview">
            <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
              <strong style="color:var(--green);">Aujourd'hui</strong>
              <span style="font-size:0.8rem;">Lundi 13 Nov</span>
            </div>

            <div class="class-row">
              <div class="time-col">08:30</div>
              <div class="info-col">
                <h4>UML & Design Pattern</h4>
                <p>Salle 204 • M. Dupont</p>
              </div>
              <div style="width:8px; height:8px; background:var(--green); border-radius:50%;"></div>
            </div>

            <div class="class-row">
              <div class="time-col">10:15</div>
              <div class="info-col">
                <h4>Anglais Technique</h4>
                <p>Labo Langue • Mme. Koné</p>
              </div>
              <div style="width:8px; height:8px; background:var(--golden-pollen); border-radius:50%;"></div>
            </div>

            <div class="class-row">
              <div class="time-col">14:00</div>
              <div class="info-col">
                <h4>Dev. Mobile (Ionic)</h4>
                <p>Salle 104 • M. Fousseyni</p>
              </div>
              <div style="width:8px; height:8px; background:var(--dark-walnut); border-radius:50%;"></div>
            </div>

            <ion-button expand="block" fill="outline" style="margin-top:15px; height:40px;" onclick="presentToast('Ouverture du planning complet...')">
              Voir la semaine complète
            </ion-button>
          </div>
        </div>

        <div style="height: 100px;"></div> <!-- Espace pour le scroll -->
        
      </ion-content>

      <!-- ==================== BOTTOM NAV (Floating) ==================== -->
      <div class="bottom-nav-container">
        <div class="nav-blur">
          <a href="#" class="nav-item active" onclick="setActiveNav(this)">
            <i class="ph ph-house"></i>
            <span>Accueil</span>
          </a>
          <a href="#schedule" class="nav-item" onclick="setActiveNav(this); scrollToSection('schedule')">
            <i class="ph ph-calendar"></i>
            <span>Planning</span>
          </a>
          <a href="#" class="nav-item" onclick="setActiveNav(this); presentToast('Notifications ouvertes')">
            <i class="ph ph-bell"></i>
            <span>Alertes</span>
          </a>
          <a href="#" class="nav-item" onclick="setActiveNav(this); presentToast('Profil étudiant')">
            <i class="ph ph-user"></i>
            <span>Profil</span>
          </a>
        </div>
      </div>

    </div>
  </ion-app>

  <script>
    // --- 1. Gestion du menu latéral ---
    const menu = document.querySelector('ion-menu');

    // --- 2. Interaction Navigation Scroll ---
    function scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // --- 3. Gestion Active State Bottom Nav ---
    function setActiveNav(element) {
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      element.classList.add('active');
    }

    // --- 4. Logique Emploi du Temps ---
    const cycleSelect = document.getElementById('cycleSelect');
    const filiereSelect = document.getElementById('filiereSelect');
    const emptyState = document.getElementById('emptyState');
    const timetablePreview = document.getElementById('timetablePreview');

    cycleSelect.addEventListener('ionChange', (ev) => {
      if (ev.detail.value) {
        filiereSelect.disabled = false;
        presentToast(`Cycle ${ev.detail.value} sélectionné`);
      }
    });

    filiereSelect.addEventListener('ionChange', (ev) => {
      if (ev.detail.value) {
        emptyState.style.display = 'none';
        timetablePreview.classList.add('active');
        presentToast(`Planning mis à jour : Filière ${ev.detail.value}`);
      }
    });

    // --- 5. Toasts de Feedback (Remplacement alert) ---
    async function presentToast(message) {
      const toast = document.createElement('ion-toast');
      toast.message = message;
      toast.duration = 2000;
      toast.position = 'bottom';
      toast.color = 'dark';
      toast.cssClass = 'custom-toast';
      document.body.appendChild(toast);
      await toast.present();
    }

    function showNotifications() {
      presentToast('3 nouvelles notifications');
    }

    function presentEventDetails(title) {
      presentToast('Détails de : ' + title);
    }

    // --- 6. Init ---
    // Au chargement, on s'assure que le menu est fermé
    document.addEventListener('DOMContentLoaded', () => {
       // Placeholder logic if needed
    });
  </script>
</body>
</html>