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
    
    E -->|Navigation| D
    E -->|Navigation| H[Showcase des Composants]
    E -->|Action| I[Déconnexion]
    
    F -->|Données| J[Total Tâches / En Cours / Terminé]
    
    G --> K[Colonnes de Statut]
    K --> L[Cartes de Tâches]
    
    H --> M[Aperçu des Composants UI]
    
    I --> C
```

## Interactions des Services

- **Navigation** : Gérée par `React Router`, permettant des transitions instantanées entre les vues sans recharger la page.
- **État UI** : Utilisation de `useState` et des props React pour la communication entre les composants parents (Pages) et enfants (Task Cards, Stats Cards).
- **Design System** : Utilisation de `Tailwind CSS` pour un rendu visuel cohérent sur tout le site.
