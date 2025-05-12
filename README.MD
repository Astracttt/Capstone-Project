# Video Game Explorer

A simple and interactive web app that allows users to explore and filter video games. Built using only HTML and JavaScript.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [How It Works](#how-it-works)  
  - [HTML](#html)  
  - [JavaScript](#javascript)  
- [Theme Switcher](#theme-switcher)  
- [How to Use](#how-to-use)  
- [Credits](#credits)  

---

## Overview

This is a front-end project created for my Capstone at West-MEC. It helps users search for and filter through a list of video games using a clean and interactive layout.

---

## Features

- Search for games by name  
- Filter by genre and platform  
- View updated results instantly  
- Reset all filters with one click  
- Switch between dark and light themes  

---

## How It Works

This app uses only **HTML** and **JavaScript**. The HTML builds the layout, and JavaScript makes everything interactive.

---

## HTML

The HTML file contains three main parts:
---
### 1. Header
```html
<header>
  <h1>Video Game Explorer</h1>
  <button id="theme-toggle">Toggle Theme</button>
</header>
Displays the title and theme toggle button
```
---

### 2. Filters and Search
```
<div class="controls">
  <input type="text" id="search-input" placeholder="Search games...">
  <select id="genre-filter">
    <option value="">All Genres</option>
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="RPG">RPG</option>
    <option value="Shooter">Shooter</option>
    <option value="Sandbox">Sandbox</option>
  </select>
  <select id="platform-filter">
    <option value="">All Platforms</option>
    <option value="PC">PC</option>
    <option value="PlayStation">PlayStation</option>
    <option value="Xbox">Xbox</option>
    <option value="Nintendo">Nintendo</option>
  </select>
  <button id="reset-btn">Reset Filters</button>
</div>
Lets users search or choose filters
```
---

### 3. Game Display
```
<main id="game-list">
  <!-- Game cards will be inserted here -->
</main>
Game cards are added here with JavaScript
```
---

### JavaScript
The JavaScript powers all functionality and dynamic behavior.

---
### 1. Game Data
```
const games = [
  { title: "Minecraft", genre: "Sandbox", platform: "PC" },
  { title: "God of War", genre: "Action", platform: "PlayStation" },
  { title: "Halo Infinite", genre: "Shooter", platform: "Xbox" },
  { title: "The Legend of Zelda", genre: "Adventure", platform: "Nintendo" },
  { title: "Elden Ring", genre: "RPG", platform: "PC" },
  { title: "Spider-Man 2", genre: "Action", platform: "PlayStation" }
];
A list of games with title, genre, and platform
```
---
### 2. Display Function
```
function displayGames(gameList) {
  const list = document.getElementById("game-list");
  list.innerHTML = "";
  gameList.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <h3>${game.title}</h3>
      <p>${game.genre}</p>
      <p>${game.platform}</p>
    `;
    list.appendChild(card);
  });
}
Adds game cards to the page based on input
```

---
### 3. Filter Function
```
function filterGames() {
  const search = document.getElementById("search-input").value.toLowerCase();
  const genre = document.getElementById("genre-filter").value;
  const platform = document.getElementById("platform-filter").value;

  const filtered = games.filter(game => {
    return (
      game.title.toLowerCase().includes(search) &&
      (genre === "" || game.genre === genre) &&
      (platform === "" || game.platform === platform)
    );
  });

  displayGames(filtered);
}
Filters games based on search and dropdown values
```
---

### 4. Event Listeners
```
document.getElementById("search-input").addEventListener("input", filterGames);
document.getElementById("genre-filter").addEventListener("change", filterGames);
document.getElementById("platform-filter").addEventListener("change", filterGames);

document.getElementById("reset-btn").addEventListener("click", () => {
  document.getElementById("search-input").value = "";
  document.getElementById("genre-filter").value = "";
  document.getElementById("platform-filter").value = "";
  displayGames(games);
});
Updates the list based on search or filter changes


Resets filters to show all games again



Theme Switcher
This feature allows the user to switch between dark and light themes.
document.getElementById("theme-toggle").addEventListener("click", () => {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
});
When the button is clicked, it swaps the theme by updating the data-theme on the <body> tag.
```

---
### How to Use
```
Open the app in your browser


Type a name in the search bar to find a game


Use dropdowns to filter by genre or platform


Click the Reset Filters button to see all games again


Click Toggle Theme to switch the color theme
```

---
### Credits
```
Created by Andrelle Beverly
West-MEC Central Coding Campus – 2025
```
---
