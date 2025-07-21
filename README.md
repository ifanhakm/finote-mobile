# Finote – Smart Financial Decision App

**Finote** is a smart and automated financial management mobile application designed to assist students, workers, and households in managing their expenses effectively. It utilizes a fuzzy logic-based decision support system (DSS) to analyze spending behavior and recommend budget strategies.
---

## 📱 Features

- 🔐 User Registration & Login (JWT Auth)
- 💰 Income and Expense Tracking
- 🧠 Smart Budget Recommendations using Fuzzy Logic
- 📊 Budget Limit Monitoring (Manual & Smart Limits)
- 📈 Financial Statistics & Reports
- 🏷️ Priority-based Categorization (Essential / Optional / Luxury)
- 🌐 Local-first API (FastAPI Backend)
- 📡 Real-time Integration with React Native Frontend (Expo Go)

---

## ⚙️ Tech Stack

### Frontend
- [React Native](https://reactnative.dev/)
- [Expo Go](https://expo.dev/)
- Context API for State Management

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- PostgreSQL (via [Neon.tech](https://neon.tech/))
- SQLAlchemy & Pydantic
- JWT Authentication

---

## 📚 API Endpoints (Main)

| Feature              | Method | Endpoint                          |
|----------------------|--------|-----------------------------------|
| Register             | POST   | `/auth/register`                 |
| Login                | POST   | `/auth/login`                    |
| Get Transactions     | GET    | `/transactions/user/{user_id}`  |
| Add Transaction      | POST   | `/transactions/`                |
| Get Budgets          | GET    | `/budgets/user/{user_id}`       |
| Add Budget           | POST   | `/budgets/`                     |
| Smart Budgeting      | POST   | `/fuzzy/status`                 |
| Financial Reports    | GET    | `/reports/statistics/{user_id}`|

> Full documentation available at: `http://<your-ip>:8000/docs`

---

## 🔐 Authentication

- JWT Auth (Bearer Token)
- Token sent via HTTP Header:
  ```http
  Authorization: Bearer <token>

---

## 📦 Project Structure

```
finote/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routers/
│   │   └── fuzzy_logic.py
│   └── .env
├── frontend/
│   ├── App.js
│   ├── config.js
│   ├── screens/
│   ├── services/
│   └── contexts/
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> Make sure to create `.env` file and fill in:

```env
DATABASE_URL=postgresql+asyncpg://<user>:<pass>@<host>/<db>
SECRET_KEY=your-secret-key
```

### 2. Frontend (React Native + Expo)

```bash
cd frontend
yarn install
npx expo start
```

> Update API URL in `frontend/config.js`:

```js
export const API_BASE_URL = "http://<your-laptop-ip>:8000";
```

---

## 🧠 Fuzzy Logic Decision Support

Finote uses a fuzzy system to evaluate a user's **income**, **expense**, and **priority level** (essential, secondary, luxury) to determine spending behavior:

* "Sangat Hemat" → "Hemat" → "Normal" → "Boros" → "Sangat Boros"

Each fuzzy evaluation will return:

```json
{
  "score": 75.2,
  "status": "Frugal"
}
```

The result is automatically linked to the relevant budget category (`limit_fuzzy`).

---

## 🔒 Example Credentials (Testing Only)

| Role      | Email                                             | Password  |
| --------- | ------------------------------------------------- | --------- |
| Student   | [mahasiswa@finote.id](mailto:mahasiswa@finote.id) | secret123 |
| Worker    | [pekerja@finote.id](mailto:pekerja@finote.id)     | secret456 |
| Household | [rumah@finote.id](mailto:rumah@finote.id)         | secret789 |

---

## ✨ Credits

Developed by [@ifanhakm](https://github.com/ifanhakm)

---

## 📄 License

GPL-3.0 License © 2025 – Finote
