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
## 1. Default Games
```js
const defaultGames = [ ... ];
```

## 2. Render Games
```
function renderGames(list = null) { ... }
```
- Dynamically creates .game-card elements

- Combines default and custom games

- Displays them inside #games container



3. ## Add New Game
```
document.getElementById("addGameForm").addEventListener("submit", function (e) { ... });
```
- Adds new game objects to localStorage
- Uses form values from:
    #newGameName #newGameImg #newGameWiki

4. ## Delete Custom Game
``` 

function deleteGame(name) { ... }
```
- Filters out the selected game from localStorage
- Removes from DOM using renderGames()



## CSS Design
1. Font & Theme Colors
```
@import url('https://fonts.googleapis.com/css2?family=Poppins:...');
:root {
  --primary: #000;
  --secondary: #e4dee8;
  --accent: #000;
}
Font: Poppins
```

- Theme: black, white, and purple for a dark, elegant look



2. ## Background Animation
```
body {
  background: linear-gradient(...);
  animation: backgroundMove 20s ease infinite;
}
@keyframes backgroundMove { ... }
Smooth color transitions using CSS animations
```


3. ## Game Cards
```
.game-card {
  background: var(--card-bg-dark);
  animation: fadeIn 0.8s ease forwards;
}
@keyframes fadeIn { ... }
Cards fade in and scale up on hover
```


## Theme Toggle
```
JavaScript
function toggleTheme() { ... }
Toggles the light-mode class on <body>
```
- Stores theme in localStorage



## CSS
```
body.light-mode {
  background: linear-gradient(...);
  color: var(--text-light);
}
```
- Changes background, text, button styles, and card backgrounds for light mode

## Search Functionality
- Live Search (Real-Time Typing)
- function handleLiveSearch(event) { ... }
- Filters games as user types
- Triggered by the input event
- Keyboard Shortcuts
```
if (event.key === "/") { document.getElementById("search").focus(); }
```
Slash key / focuses the search bar
- Enter triggers search
- r resets search



## Game Management
- Save to Local Storage
```
function saveGame(game) {
  const games = getStoredGames();
  games.push(game);
  localStorage.setItem("customGames", JSON.stringify(games));
}
```
- Ensures custom games are remembered even after refresh



## Delete with Button
```
const delBtn = document.createElement("button");
delBtn.textContent = "×";~
```

- Shown only on custom cards (not default ones)



## Search History
- Add History
```
function addSearchHistory(term) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
}
```
 - Adds new terms if not already in history
- Limits to 10 recent entries



## Render History
```
function renderSearchHistory() { ... }
```
- Creates a button for each past search
- Clicking re-applies the search
- Toggle & Clear History
- function toggleHistory() { ... }
- function clearHistory() { ... }
- Toggle shows/hides history
- Clear removes all from localStorage



## Animations
```
Background: @keyframes backgroundMove


Cards: @keyframes fadeIn


Hover Effects: scale and glow on buttons/cards
```



## Responsive Design
```
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    align-items: center;
  }
}
App scales for mobile
```

- Input forms and cards stack nicely



## Summary
JavaScript Features:
Dynamic rendering


- localStorage


- Form handling


- Filtering/search


- History tracking


- Theme toggling


- Keyboard shortcuts


- CSS Highlights:
Gradient animated backgrounds


- Glowing headers


- Card hover effects


- Fully responsive layout
