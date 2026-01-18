# ESTIM App

Application mobile pour l'École Supérieure de Technologie d'Ingénierie et de Management.

## Technologies utilisées

- [Vite](https://vite.dev/) - Outil de construction rapide pour le développement web
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [Ionic](https://ionicframework.com/) - Framework UI pour applications mobiles
- [Capacitor](https://capacitorjs.com/) - Pont natif pour applications web
- [Ionicons](https://ionic.io/ionicons) - Icônes pour les interfaces mobiles

## Installation

1. Clonez le projet
2. Installez les dépendances : `npm install`
3. Démarrez le serveur de développement : `npm run dev`

## Développement

### Développement web

```bash
npm run dev
```

### Construction pour production

```bash
npm run build
```

### Intégration mobile

#### Android
```bash
npm run cap:sync
npm run cap:android
```

#### iOS (sur macOS uniquement)
```bash
npm run cap:sync
npm run cap:ios
```

## Structure du projet

- `src/main.js` - Point d'entrée principal avec système de routing dynamique
- `src/pages/` - Dossier contenant les pages HTML
- `src/pages/config.json` - Configuration des routes
- `src/style.css` - Feuille de style principale avec TailwindCSS
- `src/ionic-loader.js` - Chargement d'Ionic
- `src/app-state.js` - Gestion de l'état de l'application
- `capacitor.config.json` - Configuration de Capacitor
- `vite.config.js` - Configuration de Vite

## Fonctionnalités

### Onboarding
- 3 écrans d'introduction avec indicateur de progression
- Système de stockage local pour ne pas réafficher après la première utilisation

### Navigation
- Système de routing dynamique basé sur Ionic
- Bottom tabs navigation avec 4 onglets (Accueil, Notifications, Calendrier, Programmes)
- Gestion de l'état de l'application

### Pages
- Page d'accueil avec annonces et accès rapide
- Page de notifications avec marquage comme lu
- Page de calendrier avec vue mois
- Page de programmes avec filtres

## Routing

L'application utilise un système de routing dynamique basé sur Ionic. Chaque fichier HTML dans le dossier `src/pages` devient automatiquement une route en ajoutant une entrée dans `src/pages/config.json` :

```json
{
  "pages": [
    {
      "name": "home",
      "path": "/",
      "file": "home.html"
    }
  ]
}
```

Le composant `page-loader` charge dynamiquement le contenu HTML correspondant à chaque route.