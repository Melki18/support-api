# Support API – Documentation

## Section 1 : Workflow Git

### 🔹 Workflow utilisé

Le projet utilise un workflow basé sur **Git Feature Branches** :

* **main** : branche stable, protégée.
* **feature/...** : une branche par fonctionnalité ou tâche.
* **test**, **fix/...**, **refactor/...** (si besoin) : branches additionnelles selon le besoin.


## Structure du projet

### 🔹 Arborescence

```
support-api/
├── src/
│   ├── models/
│   │   └── RequestType.js
│   ├── routes/
│   │   └── requestTypes.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── tests/
│   └── requestTypes.test.js
├── .eslintrc.json
├── package.json
└── README.md




<img width="220" height="538" alt="Capture d&#39;écran 2025-11-15 125908" src="https://github.com/user-attachments/assets/a1d199fe-a37e-4830-aa84-021c879f3190" />

### 🔹 Rôle de chaque dossier

* **src/models** : Modèles Mongoose
* **src/routes** : Routes Express
* **src/config** : Connexion base de données
* **src/server.js** : Point d'entrée serveur Express
* **tests/** : Tests unitaires / API
* **package.json** : Dépendances + scripts

### 🔹 Règles de protection de la branche `main`

❌ Bloquer les pushs directs sur main
✅ Require pull request before merging
✅ Require approvals : 0 (pour l'évaluation en solo)
✅ Dismiss stale pull request approvals when new commits are pushed
✅ Require status checks to pass before merging
✅ Require branches to be up to date before merging



<img width="1344" height="629" alt="Capture d&#39;écran 2025-11-14 091900" src="https://github.com/user-attachments/assets/49b9bce7-fa7b-4199-b10b-46e7a835f008" />



### Base de données

L’API utilise MongoDB.
La configuration est gérée dans src/config/database.js.

| Méthode | Route                | Description                 |
| ------- | -------------------- | --------------------------- |
| GET     | `/request-types`     | Récupère tous les types     |
| POST    | `/request-types`     | Crée un nouveau type        |
| GET     | `/request-types/:id` | Récupère un type spécifique |
| PUT     | `/request-types/:id` | Met à jour un type          |
| DELETE  | `/request-types/:id` | Supprime un type            |



<img width="1360" height="723" alt="Capture d&#39;écran 2025-11-16 124436" src="https://github.com/user-attachments/assets/fc27e077-545e-49f6-9fc7-4fad9f13aad3" />



<img width="967" height="343" alt="Capture d&#39;écran 2025-11-16 124541" src="https://github.com/user-attachments/assets/8df85c3a-518a-4bec-86d5-fd17ee36b0a5" />



### 🔹 Création d’une Pull Request

1. Pousser ta branche :

```bash
git push -u origin feature/ma-feature
```

2. Aller sur GitHub → onglet **Pull Requests**
3. Cliquer **New Pull Request**
4. Choisir :

   * Base : `main`
   * Compare : `feature/...`
5. Vérifier le diff
6. Créer la PR et demander une revue

### 🔹 Captures d'écran GitHub

*(À insérer plus tard par l’utilisateur)*

---

## Section : CI/CD

### 🔹 Badge CI/CD

*(Badge à ajouter après configuration GitHub Actions)*

### 🔹 Jobs configurés

* **Install dependencies** (npm install)
* **Run tests** (Jest)
* **Linting** (ESLint)
* **Build check** (optionnel)

### 🔹 Required checks

* Les tests doivent passer avant le merge
* Le lint doit être propre
* La branche doit être à jour avec `main`

---

## Section 3 : Installation & Utilisation

### 🔹 Prérequis

* Node.js ≥ 18
* npm ≥ 9
* Docker (si utilisation de MongoDB en container)
* MongoDB ≥ 7 (local ou container)

### 🔹 Installation

```bash
git clone https://github.com/Melki18/support-api.git
cd support-api
npm install
```

### 🔹 Variables d’environnement

Créer un fichier **.env** :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/support-api
```

### 🔹 Commandes disponibles

| Commande               | Description                           |
| ---------------------- | ------------------------------------- |
| `npm start`            | Lance le serveur                      |
| `npm run dev`          | Lance en mode développement (nodemon) |
| `npm run lint`         | Analyse ESLint                        |
| `npm test`             | Lance les tests Jest                  |
| `docker-compose up -d` | Démarre MongoDB en container          |

### 🔹 Exemples d’appels API

#### ✔️ GET `/health`

Retourne :

```json
{ "status": "ok" }
```

#### ✔️ POST `/api/request-types`

```json
{
  "code": "REQ001",
  "name": "Support général",
  "description": "Demande standard",
  "category": "support"
}
```

#### ✔️ GET `/api/request-types`

Retourne uniquement les types **actifs**.

---



---

Si tu veux, je peux maintenant ajouter tes captures, ton badge CI/CD ou adapter le README au format que ton prof veut.



