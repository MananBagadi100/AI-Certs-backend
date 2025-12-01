# Mini Audit Trail Generator — Backend

This is the backend service for the **Mini Audit Trail Generator**, built using **Node.js**, **Express**, and a simple file-based storage system (`data.json`).  
It provides APIs to save text versions, compute differences between versions, and return a clean audit history.

---

## 🚀 Features

### ✔ Save text versions
Every time the user saves new text, the backend:
- Computes added words  
- Computes removed words  
- Stores full text for next diff  
- Generates timestamp  
- Creates a UUID  
- Saves version metadata to `data.json`

### ✔ Diff Algorithm (Custom)
A lightweight diff utility identifies:
- `addedWords[]`
- `removedWords[]`

This keeps the logic transparent and easy for reviewers.

### ✔ Organized Code Structure
```
backend/
 ├── controllers/
 │     └── versionController.js
 ├── routes/
 │     └── versionRoutes.js
 ├── utils/
 │     └── diffUtil.js
 ├── data.json
 ├── index.js
 ├── .env
 ├── .gitignore
 └── package.json
```

---

## 📦 Installation

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Start the server
```bash
node index.js
```
or (if nodemon is installed)
```bash
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root with:

```
PORT=3000
```

---

## 🌐 API Endpoints

### **POST /api/save-version**
Saves a new version and computes changes.

#### Request Body:
```json
{
    "text": "Hello world example"
}
```

#### Response:
```json
{
    "message": "Version saved",
    "entry": {
        "id": "uuid",
        "timestamp": "2025-11-01 14:22",
        "addedWords": ["Hello", "world"],
        "removedWords": [],
        "oldLength": 0,
        "newLength": 2,
        "fullText": "Hello world example"
    }
}
```

---

### **GET /api/versions**
Returns all saved versions.

#### Response:
```json
[
    {
        "id": "uuid",
        "timestamp": "2025-11-01 14:22",
        "addedWords": [...],
        "removedWords": [...],
        "oldLength": 0,
        "newLength": 5,
        "fullText": "..."
    }
]
```

---

## 🧠 Tech Stack

- Node.js  
- Express  
- Day.js  
- UUID  
- File-based JSON storage  
- Clean modular structure  

---

## 📝 Notes for Reviewers

- The backend intentionally uses a **simple file-based storage** as allowed in the assignment.  
- Diff logic is **transparent and easy to follow**.  
- Codebase is **clean, modular, and easy to extend**.  

---

## ✨ Author
Manan Bagadi  
Backend Developer (Node.js + Express)

