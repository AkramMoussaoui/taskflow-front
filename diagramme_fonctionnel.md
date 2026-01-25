# Diagramme Fonctionnel - TaskFlow

Ce document décrit les interactions entre les différents composants de l'application et le flux utilisateur.

## Architecture Visuelle
![TaskFlow Architecture & User Flow](./docs/assets/functional_diagram.png)

## Flux de l'Application

```mermaid
graph TD
    A[Utilisateur] --> B{Authentification}
    B -->|Non connecté| C[Page de Connexion]
    B -->|Connecté| D[Tableau de Bord]
    
    C <-->|Lien| Signup[Page d'Inscription]
    Signup -->|Création de compte| D
    
    C -->|Identifiants valides| D
    
    D --> E[Barre Latérale - Sidebar]
    D --> F[Section Statistiques]
    D --> G[Tableau Kanban]
    D -->|Action| CT[Popup de Création de Tâche]
    CT -->|Validation| G
    
    E -->|Navigation| D
    E -->|Navigation| H[Showcase des Composants]
    E -->|Action| I[Déconnexion]
    
    F -->|Données| J[Total Tâches / En Cours / Terminé]
    
    G --> K[Colonnes de Statut]
    K --> L[Cartes de Tâches]
    L -->|Glisser-déposer| K
    L -->|Clic| DV[Vue Détaillée de Tâche]
    DV -->|Edition/Suppression| G
    
    H --> M[Aperçu des Composants UI]
    
    I --> C
```

## Interactions des Services

- **Navigation** : Gérée par `React Router`, permettant des transitions instantanées entre les vues sans recharger la page.
- **Gestion du Drag & Drop** : Utilisation de `react-dnd` pour synchroniser l'UI avec l'état des tâches lors des déplacements.
- **Gestion Complète des Tâches** : Utilisation de modales `Dialog` (Radix UI) pour la création, l'édition détaillée (titre, tags, dates, commentaires) et la suppression des tâches.
- **État Global (Simulé)** : Utilisation de `useState` dans le Dashboard pour centraliser la liste des tâches et assurer la cohérence visuelle après chaque action utilisateur (immédiateté des mises à jour).
- **Design System** : Utilisation de `Tailwind CSS 4` pour un rendu visuel premium et cohérent sur tout le site.
