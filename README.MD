
# Video Game Explorer - Capstone Project  
**Created by Andrelle Beverly**  
---

## Project Description  
The **Video Game Explorer** is a dynamic, visually-rich web app that allows users to:  
- View default video games  
- Search for games in real-time  
- Add their own games (with name, image, and wiki link)  
- Remove custom games  
- Toggle between **Dark Mode** and **Light Mode**  
- View and manage **search history**  

This project uses **JavaScript**, **CSS**, and **HTML** with **localStorage** to persist user data without any external APIs.

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

### 1. Default Games  
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
- I created a default list of objects with key/value pairs for game data.
- Each object uses properties like `name`, `image`, and `wiki`.

---

### 2. Render Games  
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
- Dynamically renders `.game-card` elements to the DOM.
- Combines default and custom games using arrays.

---

### 3. Add New Game  
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
- Uses form input elements to capture user data.
- Stores new game objects in localStorage and updates display.

---

### 4. Delete Custom Game  
```js
function deleteGame(name) {
  const games = getStoredGames();
  const updated = games.filter(game => game.name !== name);
  localStorage.setItem("customGames", JSON.stringify(updated));
  renderGames();
}
```
- Removes a specific game from localStorage using `filter()`.
- Also re-renders the game cards after deletion.

---

## CSS Design

### 1. Font & Theme Colors  
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

:root {
  --primary: #000;
  --secondary: #e4dee8;
  --accent: #7f5af0;
}
```
- Uses an external font (`Poppins`) for consistent UI.
- Declares CSS variables for color customization and theme consistency.

---

### 2. Background Animation  
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
- Smoothly animated background using CSS keyframes.

---

### 3. Game Cards  
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
- Each card fades in and scales on hover with transitions and animation.

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
- Uses `classList.toggle()` and saves the theme to localStorage.

### CSS  
```css
body.light-mode {
  background: linear-gradient(to bottom, #fff, #f2f2f2);
  color: #000;
}
```
- Styles adjust based on the `.light-mode` class.

---

## Search Functionality

### Live Search  
```js
function handleLiveSearch(event) {
  const term = event.target.value.toLowerCase();
  const filtered = [...defaultGames, ...getStoredGames()].filter(game =>
    game.name.toLowerCase().includes(term)
  );
  renderGames(filtered);
}
```
- Filters games as the user types using `.includes()` and `.toLowerCase()`.

---

### Keyboard Shortcuts  
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
- Pressing `/` focuses the input, `r` resets the search.

---

## Game Management

### Save to localStorage  
```js
function saveGame(game) {
  const games = getStoredGames();
  games.push(game);
  localStorage.setItem("customGames", JSON.stringify(games));
}
```
- Stores user-submitted games using `JSON.stringify()`.

---

### Delete Button (Only on Custom Games)  
```js
if (game.isCustom) {
  const delBtn = document.createElement("button");
  delBtn.textContent = "Ã";
  delBtn.addEventListener("click", () => deleteGame(game.name));
  card.appendChild(delBtn);
}
```
- Only custom games get a delete button.

---

## Search History

### Add to History  
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
- Saves unique search terms and limits history length.

---

### Render History  
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
```
- Creates clickable buttons for past searches.

---

### Toggle & Clear History  
```js
function toggleHistory() {
  document.getElementById("historyBox").classList.toggle("hidden");
}
function clearHistory() {
  localStorage.removeItem("searchHistory");
  renderSearchHistory();
}
```
- Users can show/hide or completely clear their search history.

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
- Uses CSS keyframes and hover transitions for buttons and cards.

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
- The app scales well on smaller screens using media queries.

---

## Summary

### JavaScript Features:  
- Object arrays to store data  
- Form handling for game input  
- Real-time search with filters  
- localStorage for games and history  
- Theme toggle with persistence  
- Keyboard accessibility  

### CSS Highlights:  
- Custom font and color variables  
- Animated backgrounds and cards  
- Light/dark mode styling  
- Responsive layout with mobile-friendly design 

