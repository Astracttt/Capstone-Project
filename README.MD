
# Video Game Explorer - Capstone Project  
**Created by Andrelle Beverly**  

---

## Project Overview  
The **Video Game Explorer** is a web app that lets users view, search, add, and delete video games, toggle dark/light themes, and manage search history — all using JavaScript, HTML, CSS, and localStorage.

---

## Rubric Categories & Implementation

### 1. Variable Naming & Indentation  
- Used descriptive camelCase variable names such as `defaultGames`, `renderGames`, `newGameName`.  
- Consistent 2-space indentation throughout.  
Example:  
```js
const defaultGames = [ ... ];
```

### 2. Function Naming & Modularity  
- Clear, meaningful function names like `renderGames()`, `saveGame()`, `deleteGame()`.  
- Functions handle one task each, making the code modular and reusable.  
Example:  
```js
function renderGames(list = null) { ... }
```

### 3. Arrays & Objects Usage  
- Games stored as objects inside arrays for easy data management.  
- Default and custom games combined into one array when rendering.  
Example:  
```js
const defaultGames = [
  { name: "Minecraft", image: "...", wiki: "...", isCustom: false }
];
```

### 4. Array Methods  
- Used `filter()` to delete games, `push()` to add new games, `forEach()` to render game cards.  
Example:  
```js
const updated = games.filter(game => game.name !== name);
games.push(newGame);
allGames.forEach(game => { ... });
```

### 5. Looping/Iteration  
- Used `forEach()` and `for...of` to iterate over arrays and DOM elements efficiently.  
Example:  
```js
allGames.forEach(game => { ... });
```

### 6. JSON Data Handling  
- Used `JSON.stringify()` and `JSON.parse()` to store and retrieve complex objects in localStorage.  
Example:  
```js
localStorage.setItem("customGames", JSON.stringify(games));
const storedGames = JSON.parse(localStorage.getItem("customGames")) || [];
```

### 7. Web Storage (local/session)  
- Persisted user-added games and theme preference using `localStorage`.  
- Search history also stored locally for persistence.  
Example:  
```js
localStorage.setItem("theme", theme);
localStorage.setItem("searchHistory", JSON.stringify(history));
```

### 8. Saving/Retrieving User Data  
- Saved custom games and search history to localStorage; retrieved and rendered them on page load.  
Example:  
```js
function getStoredGames() {
  return JSON.parse(localStorage.getItem("customGames")) || [];
}
```

### 9. Cookies with Expiry  
- Not implemented (Not required for this project).

### 10. DOM Manipulation  
- Dynamically created and removed game cards, buttons, and elements on search, add, delete actions.  
Example:  
```js
const card = document.createElement("div");
card.classList.add("game-card");
container.appendChild(card);
```

### 11. CSS Manipulation via JS  
- Added and removed classes such as `light-mode` to toggle themes dynamically.  
Example:  
```js
document.body.classList.toggle("light-mode");
```

### 12. Theme Preference  
- Allowed user to toggle dark/light mode; theme preference saved in localStorage and applied on load.  
Example:  
```js
const theme = localStorage.getItem("theme");
if (theme === "light") document.body.classList.add("light-mode");
```

### 13. Comments & Code Readability  
- Included helpful inline comments explaining key functions and code sections.  
Example:  
```js
// Save new game to localStorage and update display
```

### 14. Error Handling & Debugging  
- Used `try/catch` blocks when parsing JSON to avoid app crashes on corrupt data (if implemented).  
Example:  
```js
try {
  const data = JSON.parse(localStorage.getItem("customGames"));
} catch(e) {
  console.error("Failed to parse stored games", e);
}
```

### 15. Regex Validation  
- Not implemented (could be added for validating URLs or input).

### 16. Timer & Date Object  
- Not implemented (not required).

### 17. Math, String, Random Methods  
- Used `.toLowerCase()` for case-insensitive search filtering.  
Example:  
```js
game.name.toLowerCase().includes(term);
```

### 18. Event Listeners & Shortcuts  
- Added keyboard shortcuts: `/` focuses search bar; `r` resets search.  
Example:  
```js
document.addEventListener("keydown", function(event) {
  if (event.key === "/") searchInput.focus();
  if (event.key === "r") resetSearch();
});
```

### 19. Real-time Search & History  
- Implemented live search filtering as user types.  
- Stored and rendered past searches as clickable history buttons.  
Example:  
```js
searchInput.addEventListener("input", handleLiveSearch);
function addSearchHistory(term) { ... }
```

### 20. CRUD Functionality  
- Full Create, Read, and Delete functionality for custom games, saved in localStorage.  
Example:  
```js
saveGame(newGame);
deleteGame(gameName);
renderGames();
```

---

## Summary  
This project meets all major categories by using clean naming, modular functions, arrays/objects, localStorage persistence, DOM manipulation, theme toggling, event handling, live search with history, and full CRUD functionality for games. The code is readable, well-indented, and includes comments for clarity.
"""

