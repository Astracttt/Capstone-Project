# Video Game Explorer - Capstone Project  
**Created by Andrelle Beverly**  
---

## Project Description  
The **Video Game Explorer** is a project that has :  
- View default video games  
- Search for games in real-time  
- Add their own games (with name, image, and wiki link)  
- Remove custom games  
- Toggle between **Dark Mode** and **Light Mode**  
- View and manage **search history**  

This project uses **JavaScript**, **CSS**, and **HTML** with **localStorage** 

---

## Table of Contents  
1. [JavaScript Features](#javascript-features)  
2. [CSS Design](#css-design)  
3. [Theme Toggle](#theme-toggle)  
4. [Search Functionality](#search-functionality)  
5. [Game Management](#game-management)  
6. [Search History](#search-history)  
7. [Animations](#animations)  
8. [Responsive Design](#responsive-design)  

---

## JavaScript Features

### 1. Data Structures and Object Arrays  
```js
const defaultGames = [
  {
    name: "Minecraft",
    image: "images/minecraft.jpg",
    wiki: "https://en.wikipedia.org/wiki/Minecraft",
    isCustom: false
  },
  // more games...
];
```
- Used arrays of objects to store game information with keys: `name`, `image`, `wiki`, and `isCustom` to distinguish default vs custom games.

### 2. DOM Manipulation and Dynamic Rendering  
```js
function renderGames(list = null) {
  const container = document.getElementById("games");
  container.innerHTML = "";
  const allGames = list || [...defaultGames, ...getStoredGames()];
  allGames.forEach(game => {
    const card = createGameCard(game);
    container.appendChild(card);
  });
}
```
- Dynamically creates and appends game cards to the page combining default and user-added games.

### 3. Form Handling and Event Listeners  
```js
document.getElementById("addGameForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("newGameName").value;
  const image = document.getElementById("newGameImg").value;
  const wiki = document.getElementById("newGameWiki").value;
  const newGame = { name, image, wiki, isCustom: true };
  saveGame(newGame);
  renderGames();
});
```
- Captures user input from form and adds a new game to localStorage and UI.

### 4. Local Storage Integration  
```js
function saveGame(game) {
  const games = getStoredGames();
  games.push(game);
  localStorage.setItem("customGames", JSON.stringify(games));
}
```
- Saves and retrieves custom games from localStorage for persistence.

### 5. Filtering and Search  
```js
function handleLiveSearch(event) {
  const term = event.target.value.toLowerCase();
  const filtered = [...defaultGames, ...getStoredGames()].filter(game =>
    game.name.toLowerCase().includes(term)
  );
  renderGames(filtered);
}
```
- Implements real-time search filtering based on user input.

### 6. Keyboard Shortcuts  
```js
document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    document.getElementById("search").focus();
  }
  if (event.key === "r") {
    document.getElementById("search").value = "";
    renderGames();
  }
});
```
- Provides keyboard accessibility for quick search focus and reset.

### 7. Deleting Custom Games  
```js
function deleteGame(name) {
  const games = getStoredGames();
  const updated = games.filter(game => game.name !== name);
  localStorage.setItem("customGames", JSON.stringify(updated));
  renderGames();
}
```
- Removes games from localStorage and updates the UI accordingly.

---

## CSS Design

### 1. Font and Color Variables  
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
:root {
  --primary: #000;
  --secondary: #e4dee8;
  --accent: #7f5af0;
}
```
- Imported Poppins font and defined CSS variables for consistent color theming.

### 2. Animated Background  
```css
body {
  background: linear-gradient(-45deg, #0f0f0f, #1a1a1a, #2a2a2a);
  background-size: 400% 400%;
  animation: backgroundMove 20s ease infinite;
}

@keyframes backgroundMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
- Created a smoothly animated gradient background using keyframes.

### 3. Game Card Styling and Hover Effects  
```css
.game-card {
  background: var(--card-bg-dark);
  color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px var(--accent);
  animation: fadeIn 0.8s ease forwards;
  transition: transform 0.3s ease;
}
.game-card:hover {
  transform: scale(1.05);
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```
- Designed cards with fade-in animation and scaling on hover for a polished UI.

---

## Theme Toggle

### JavaScript  
```js
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", theme);
}
```
- Toggles between dark and light themes and saves preference in localStorage.

### CSS  
```css
body.light-mode {
  background: linear-gradient(to bottom, #fff, #f2f2f2);
  color: #000;
}
```
- Changes background and text colors when light mode is active.

---

## Search Functionality

### Live Search and Filtering  
```js
function handleLiveSearch(event) {
  const term = event.target.value.toLowerCase();
  const filtered = [...defaultGames, ...getStoredGames()].filter(game =>
    game.name.toLowerCase().includes(term)
  );
  renderGames(filtered);
}
```
- Enables real-time filtering of games as user types.

### Keyboard Accessibility  
```js
document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    document.getElementById("search").focus();
  }
  if (event.key === "r") {
    document.getElementById("search").value = "";
    renderGames();
  }
});
```
- Keyboard shortcuts to focus search and reset results.

---

## Game Management

### Add and Save Games to localStorage  
```js
function saveGame(game) {
  const games = getStoredGames();
  games.push(game);
  localStorage.setItem("customGames", JSON.stringify(games));
}
```
- Stores user-added games persistently.

### Delete Button on Custom Games  
```js
if (game.isCustom) {
  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  delBtn.addEventListener("click", () => deleteGame(game.name));
  card.appendChild(delBtn);
}
```
- Provides a delete button only on user-added games.

---

## Search History

### Add Unique Search Terms  
```js
function addSearchHistory(term) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(term)) {
    history.unshift(term);
    if (history.length > 10) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}
```
- Saves recent unique searches, limiting history to 10 entries.

### Render and Manage Search History  
```js
function renderSearchHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const historyBox = document.getElementById("historyBox");
  historyBox.innerHTML = "";
  history.forEach(term => {
    const btn = document.createElement("button");
    btn.textContent = term;
    btn.addEventListener("click", () => {
      document.getElementById("search").value = term;
      handleLiveSearch({ target: { value: term } });
    });
    historyBox.appendChild(btn);
  });
}

function toggleHistory() {
  document.getElementById("historyBox").classList.toggle("hidden");
}

function clearHistory() {
  localStorage.removeItem("searchHistory");
  renderSearchHistory();
}
```
- Displays clickable past searches and allows toggling or clearing history.

---

## Animations

```css
@keyframes backgroundMove { ... }
@keyframes fadeIn { ... }

button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px var(--accent);
}
```
- Applied CSS animations and transitions to backgrounds, cards, and buttons for interactive feedback.

---

## Responsive Design

```css
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    align-items: center;
  }
  .game-card {
    width: 90%;
  }
}
```
- Used media queries to ensure the layout adapts smoothly to smaller screens for mobile-friendly usability.

---

## Summary

### JavaScript  
- Object arrays and data structures  
- DOM manipulation and dynamic content rendering  
- Form event handling and validation  
- LocalStorage for persistence of data and settings  
- Real-time search filtering  
- Keyboard accessibility and shortcuts  
- Adding and deleting custom games  

### CSS  
- Custom fonts and color variables  
- Animated backgrounds and UI elements  
- Dark and light theme toggling  
- Responsive layout for multiple screen sizes  
- Smooth animations and hover effects  

---
