# Exercice 13 – Authentification Firebase

Cette mini-application React démontre comment protéger une interface ainsi qu'une API Express à l'aide de Firebase Authentication.

## Fonctionnalités

- Page de connexion permettant d'authentifier un utilisateur avec Firebase
- Conservation du jeton Firebase et protection des routes côté client
- Appels HTTP vers l'API du projet intégrateur avec ajout automatique du jeton `Bearer`
- Liste d'utilisateurs protégée, disponible uniquement après authentification

## Prérequis

- Node.js 18+
- Un projet Firebase configuré avec Firebase Authentication (courriel/mot de passe)
- Votre API Express (ou autre) prête à valider les jetons Firebase côté serveur

## Configuration

1. Copier le fichier `.env.example` vers `.env` et compléter les informations Firebase :

   ```bash
   cp .env.example .env
   ```

   Remplir ensuite les variables `VITE_FIREBASE_*` avec les valeurs du projet Firebase et ajuster `VITE_API_BASE_URL` avec l'URL de votre API.

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

4. (Optionnel) Construire la version de production :

   ```bash
   npm run build
   ```

## Sécurisation de l'API

Chaque appel Axios inclut automatiquement l'en-tête `Authorization: Bearer <token Firebase>` dès que l'utilisateur est connecté. Assurez-vous que votre API valide ce jeton à l'aide du SDK Admin Firebase.

## Structure principale

- `src/firebase/firebaseApp.ts` : initialisation du SDK Firebase
- `src/contexts/LoginContext.tsx` : gestion de l'état d'authentification et du jeton
- `src/components/Login/Login.tsx` : page de connexion
- `src/components/Menu/Menu.tsx` : navigation protégée et bouton de déconnexion
- `src/components/UserList/UserList.tsx` : appel protégé vers l'API et affichage de la liste

## Licence

Ce projet est fourni à des fins pédagogiques dans le cadre de l'exercice DevWeb3.
