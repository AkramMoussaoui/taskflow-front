# Diagramme Fonctionnel - TaskFlow

Ce document décrit les interactions entre les différents composants de l'application et le flux utilisateur.

## Architecture Visuelle
![TaskFlow Architecture & User Flow](./docs/assets/functional_diagram.png)

## Flux de l'Application

```mermaid
graph TD
    User[Utilisateur] --> LP[Landing Page Premium]
    
    subgraph Frontend [Application React Client]
        LP -->|Clic: Sign In| Login[Page de Connexion]
        LP -->|Clic: Get Started| Signup[Page d'Inscription]
        
        Login <-->|Lien| Signup
        
        Login -->|Auth Réussie| Dashboard[Tableau de Bord]
        Signup -->|Compte Créé| Dashboard
        
        Dashboard --> Sidebar[Barre Latérale]
        Dashboard --> Kanban[Tableau Kanban]
        Dashboard --> Stats[Statistiques]
        Dashboard -->|Action| TaskModal[Modale de Tâche]
    end

    subgraph Backend [AWS Serverless Cloud]
        API[Lambda Function URL]
        Auth[AWS Cognito]
        DB[(DynamoDB)]
    end

    Login -.->|Authentification| Auth
    Signup -.->|Création Compte| Auth
    
    Dashboard <-->|Fetch Tasks| API
    TaskModal -->|Create/Update/Delete| API
    
    API <-->|CRUD Operations| DB
    API -.->|Token Verification| Auth
```

## Interactions des Services

- **Navigation** : Gérée par `React Router`, permettant des transitions instantanées entre les vues sans recharger la page.
- **Gestion du Drag & Drop** : Utilisation de `react-dnd` pour synchroniser l'UI avec l'état des tâches lors des déplacements.
- **Gestion Complète des Tâches** : Utilisation de modales `Dialog` (Radix UI) pour la création, l'édition détaillée (titre, tags, dates, commentaires) et la suppression des tâches.
- **État Global (Simulé)** : Utilisation de `useState` dans le Dashboard pour centraliser la liste des tâches et assurer la cohérence visuelle après chaque action utilisateur (immédiateté des mises à jour).
- **Design System** : Utilisation de `Tailwind CSS 4` pour un rendu visuel premium et cohérent sur tout le site.
