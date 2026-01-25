# Contexte du Projet - TaskFlow

## Description
TaskFlow est une application web moderne et premium de gestion de tâches. Elle est conçue pour offrir une expérience utilisateur fluide, esthétique et performante pour les équipes souhaitant organiser leur travail efficacement.

## Fonctionnalités Principales
- **Authentification Premium** : Une page de connexion élégante avec un thème clair, des animations fluides et une vérification de l'état de chargement.
- **Création de Compte (Signup)** : Une page d'inscription complète incluant :
    - Sélection de rôle via un menu déroulant.
    - **Validation Dynamique du Mot de Passe** : Analyse en temps réel de la complexité (longueur, majuscule, chiffre, caractère spécial).
- **Tableau de Bord Intégré** : Une vue d'ensemble centralisée combinant des indicateurs de performance clés (KPI) et un tableau Kanban.
- **Indicateurs de Performance (Stats)** : Suivi en temps réel des tâches totales, en cours, terminées et des membres de l'équipe.
- **Tableau Kanban** : Organisation visuelle des tâches par colonnes (À faire, En cours, Révision, Terminé) avec cards détaillées (priorité, tags, assignés, dates).
- **Showcase du Design System** : Une bibliothèque exhaustive de composants UI réutilisables basés sur les meilleures pratiques de design (Radix UI, Tailwind CSS).
- **Navigation Intuitive** : Une barre latérale persistante permettant de naviguer entre le dashboard principal et le showcase des composants.

## Architecture Technique
- **Frontend** : React 19 (TypeScript)
- **Routage** : React Router Dom 7
- **Stylisation** : Tailwind CSS 4 & Radix UI pour des composants accessibles et hautement personnalisables.
- **Icons** : Lucide React & Logo SVG personnalisé.
- **Animations** : Framer Motion pour les transitions et micro-interactions premium.
- **Build Tool** : Vite pour un développement rapide et des builds optimisés.

## Structure du Projet (src)
- `app/` : Racine de l'application.
    - `components/` : Composants réutilisables (UI primitives, Task-specific components).
    - `pages/` : Composants de niveau page (Login, Dashboard, Showcase).
    - `App.tsx` : Configuration des routes principales.
- `styles/` : Fichiers de configuration CSS et thèmes.

## Prérequis
- Node.js (Version LTS recommandée)
- Yarn ou NPM

## Comment démarrer
1.  Installer les dépendances :
    ```bash
    yarn install
    # ou
    npm install
    ```
2.  Lancer le serveur de développement :
    ```bash
    yarn dev
    # ou
    npm run dev
    ```
3.  Accéder à l'application via `http://localhost:5173`.
