# Contexte du Projet - TaskFlow

## Description
TaskFlow est une application web moderne et premium de gestion de tâches. Elle est conçue pour offrir une expérience utilisateur fluide, esthétique et performante pour les équipes souhaitant organiser leur travail efficacement.

## Fonctionnalités Principales
- **Landing Page Premium** : Une vitrine moderne et immersive présentant les bénéfices de TaskFlow, avec une navigation fluide et des sections Hero, Fonctionnalités, Témoignages et Tarification.
- **Authentification Premium** : Une page de connexion élégante avec un thème clair, des animations fluides et une vérification de l'état de chargement.
- **Création de Compte (Signup)** : Une page d'inscription complète incluant :
    - Sélection de rôle via un menu déroulant.
    - **Validation Dynamique du Mot de Passe** : Analyse en temps réel de la complexité (longueur, majuscule, chiffre, caractère spécial).
- **Création de Tâches (Popup)** : Une interface modale moderne pour ajouter instantanément des tâches incluant :
    - Titre (requis), Description détaillée.
    - Sélection de priorité (Low, Medium, High, Critical).
    - Système de **Multi-Tags** interactif avec badges supprimables.
- **Vue Détaillée de Tâche** : Une interface riche accessible en cliquant sur une tâche, permettant :
    - Edition complète : Titre (avec icône d'édition), Description, Priorité et Tags.
    - Gestion du calendrier : Ajout et modification de la date d'échéance.
    - Système de Commentaires : Historique des échanges et ajout de nouveaux messages.
    - Suppression sécurisée de la tâche.
- **Tableau de Bord Intégré** : Une vue d'ensemble centralisée combinant des indicateurs de performance clés (KPI) et un tableau Kanban.
- **Indicateurs de Performance (Stats)** : Suivi en temps réel des tâches totales, en cours, terminées et des membres de l'équipe.
- **Tableau Kanban Interactif** : Organisation visuelle des tâches par colonnes (À faire, En cours, Révision, Terminé).
    - **Glisser-Déposer (Drag & Drop)** : Déplacement fluide des tâches entre les colonnes pour une mise à jour instantanée du statut.
    - **Cards Détaillées** : Priorité, tags, assignés et dates d'échéance.
- **Showcase du Design System** : Une bibliothèque exhaustive de composants UI réutilisables basés sur les meilleures pratiques de design (Radix UI, Tailwind CSS).
- **Navigation Intuitive** : Une barre latérale persistante permettant de naviguer entre le dashboard principal et le showcase des composants.

## Architecture Technique
- **Frontend** : React 19 (TypeScript)
    - **Build Tool** : Vite (Rapide et optimisé)
    - **Routage** : React Router Dom 7
    - **Stylisation** : Tailwind CSS 4 & Radix UI
    - **Icons** : Lucide React
    - **Animations** : Framer Motion
    - **Drag & Drop** : `react-dnd`
- **Backend** : AWS Serverless
    - **Core** : AWS Lambda (Node.js) avec Function URL pour l'API.
    - **Infrastructure** : AWS CDK (TypeScript) pour le déploiement.
    - **Base de Données** : DynamoDB (Stockage NoSQL performant).
    - **Authentification** : AWS Cognito (Gestion des utilisateurs sécurisée).
    - **Communication** : API REST via Lambda Function URL.

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
