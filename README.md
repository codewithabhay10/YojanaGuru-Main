# 🌐 Yojana Guru

An AI-driven platform designed to help users discover **personalized government schemes** based on their profile, location, and needs — with multilingual support and accessibility features built in.

![YojanaGuru Screenshot](path/to/screenshot.png)

---

## 🚀 Features

- ✅ **AI-Powered Scheme Discovery**  
  Uses Groq-backed AI to recommend schemes tailored to user profiles.

- 💬 **Multilingual Chatbot**  
  Supports multiple Indian languages for inclusive access via FastAPI + Google Translate.

- 🎙️ **Voice-Based Search**  
  Enables users to speak queries instead of typing, improving accessibility.

- 🎯 **Profile-Based Filtering**  
  Filter by age, income, location, gender, occupation, and more.

- 📱 **Responsive UI**  
  Optimized for desktop and mobile usage.

---

## 🛠 Tech Stack

### 🔹 Frontend
- [React.js](https://reactjs.org/)
- CSS (Custom + Framework)
- React Hooks & Context API

### 🔹 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Groq](https://groq.com/) for AI-based recommendations
- [FastAPI](https://fastapi.tiangolo.com/) for translation services
- MongoDB (or your preferred database)

---

## 📂 Folder Structure
YojanaGuru/
├── backend/ # Node.js + FastAPI services
├── frontend/ # React.js app
│ └── components/ # Chatbot, Filters, Scheme cards
├── .env # Environment config
├── README.md # Project documentation
<img width="1910" height="870" alt="Screenshot 2025-07-10 160629" src="https://github.com/user-attachments/assets/e3498c3f-26d2-44ef-9aff-ed4deed50db7" />
1. **User inputs profile data** → (age, income, location, etc.)
2. **Chatbot (or voice)** interacts in the user's language
3. **Backend fetches** schemes using filters and AI
4. **Results displayed** dynamically with view options
<img width="1880" height="840" alt="Screenshot 2025-07-10 160602" src="https://github.com/user-attachments/assets/05ce77a9-07a9-4300-835c-91c77354c525" />
Install Dependencies
cd frontend
npm install
npm start
cd backend
npm install
# For FastAPI translation service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn multilingual:app --reload
<img width="1892" height="845" alt="Screenshot 2025-07-10 160558" src="https://github.com/user-attachments/assets/e3031515-6274-4e45-a7e9-a85cec39a725" />
