# 🎬 Tickitz - Cinema Ticket Booking App

Tickitz is a **cinema ticket booking web application** built with **React + Vite**.  
It allows users to browse movies, book seats, make payments, and view their tickets — all in one place.  

---

## 🚀 Features

- **Authentication**
  - Sign Up, Sign In, Forget Password
- **Home Page**
  - Landing page with highlights
- **Movie List**
  - Popular and upcoming movies
- **Movie Details**
  - Detailed view when clicking on a movie
- **Order**
  - Seat selection interface
- **Payment**
  - Choose payment methods
- **Result**
  - Display e-ticket after payment

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) (Frontend framework & bundler)
- [Context API](https://react.dev/learn/scaling-up-with-reducer-and-context) (State management)
- [Redux](https://redux.js.org/) (Global state management)
- [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)
- [NGINX](https://nginx.org/) (Frontend deployment)

---

## 📂 Project Structure

```
tickitz/
├── src/               # React application source code
├── public/            # Static files
├── Document/          # Documentation
│   └── Weekly Task - 7.md   # Basic DevOps notes
└── ...
```

### Folder Structure

- **components** : shared components (if a component is unique to a page, it doesn't belong here), general small components  
- **contexts** : React context for global state management  
- **redux** : Redux slices for state management  
- **pages** : Each individual page (Auth, Home, MovieList, Details, Order, Payment, Result)  
- **data** : JSON data and constant variables that don’t change  
- **hooks** : Custom React hooks  
- **utils** : Utility functions, pure functions (same input → same output)  

---



## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/tickitz.git
cd tickitz
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm run dev
```

### 4️⃣ Build for production
```bash
npm run build
```

---

## 📝 Documentation

This repository also includes **Basic DevOps documentation** in:  

```
Document/Week-7/
```

---