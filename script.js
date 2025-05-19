// ========== 1. Arrays & 2. Objects ==========
const defaultGames = [
  {
    name: "The Witcher 3",
    img: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    wiki: "https://en.wikipedia.org/wiki/The_Witcher_3:_Wild_Hunt"
  },
  {
    name: "God of War",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    wiki: "https://en.wikipedia.org/wiki/God_of_War_(2018_video_game)"
  },
  {
    name: "Minecraft",
    img: "https://upload.wikimedia.org/wikipedia/en/b/b6/Minecraft_2024_cover_art.png",
    wiki: "https://en.wikipedia.org/wiki/Minecraft"
  },
  {
    name: "Valorant",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/500px-Valorant_logo_-_pink_color_version.svg.png",
    wiki: "https://en.wikipedia.org/wiki/Valorant"
  }
];

// ========== 3. Local Storage ==========
function getStoredGames() {
  return JSON.parse(localStorage.getItem("customGames")) || [];
}

function saveGame(game) {
  const games = getStoredGames();
  games.push(game);
  localStorage.setItem("customGames", JSON.stringify(games));
}

function deleteGame(name) {
  const games = getStoredGames().filter(g => g.name !== name);
  localStorage.setItem("customGames", JSON.stringify(games));
  renderGames();
}

// ========== 4. DOM Manipulation & 5. Loops ==========
function renderGames(list = null) {
  const allGames = [...defaultGames, ...getStoredGames()];
  const gamesToShow = list || allGames;
  const container = document.getElementById("games");
  container.innerHTML = "";

  gamesToShow.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const image = document.createElement("img");
    image.src = game.img;
    image.alt = game.name;

    const title = document.createElement("h3");
    title.textContent = game.name;

    const cardLink = document.createElement("a");
    cardLink.href = game.wiki;
    cardLink.target = "_blank";
    cardLink.style.textDecoration = "none";
    cardLink.style.color = "inherit";

    const inner = document.createElement("div");
    inner.appendChild(image);
    inner.appendChild(title);
    cardLink.appendChild(inner);
    card.appendChild(cardLink);

    // ========== 6. Conditionals ==========
    if (!defaultGames.find(g => g.name === game.name)) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "Ã";
      delBtn.onclick = () => deleteGame(game.name);
      card.appendChild(delBtn);
    }

    container.appendChild(card);
  });

  // ========== 7. InnerText ==========
  const countEl = document.getElementById("gameCount");
  if (countEl) {
    countEl.textContent = `Games Displayed: ${gamesToShow.length}`;
  }
}

// ========== 8. Theme Toggle ==========
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeButton();
}

function applyStoredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
  updateThemeButton();
}

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-mode");
  document.querySelector(".theme-toggle").textContent = isLight ? "Dark Mode" : "Light Mode";
}

// ========== 9. Event Handling & 10. Keyboard Shortcuts ==========
function handleSearch(event) {
  if (event.key === "Enter") {
    startSearchTimer(); // Start timer on search
    const searchTerm = event.target.value.trim().toLowerCase();
    if (searchTerm.length === 0) return;
    addSearchHistory(searchTerm);
    const allGames = [...defaultGames, ...getStoredGames()];
    const filtered = allGames.filter(game =>
      game.name.toLowerCase().includes(searchTerm)
    );
    renderGames(filtered);
  } else if (event.key === "/") {
    event.preventDefault();
    document.getElementById("search").focus();
  } else if (event.key === "r") {
    resetSearch();
  }
}


// ========== 11. Functions ==========
function resetSearch() {
  document.getElementById("search").value = "";
  renderGames();
}

// ========== 12. History with Buttons ==========
function addSearchHistory(term) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(term)) {
    history.unshift(term);
    if (history.length > 10) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  const container = document.getElementById("history");
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  container.innerHTML = "";
  history.forEach(term => {
    const btn = document.createElement("button");
    btn.textContent = term;
    btn.onclick = () => {
      document.getElementById("search").value = term;
      handleSearch({ key: "Enter", target: { value: term } });
    };
    container.appendChild(btn);
  });
}

// ========== 13. Boolean Toggle ==========
let historyVisible = true;

function toggleHistory() {
  const historyEl = document.getElementById("history");
  historyVisible = !historyVisible;
  historyEl.style.display = historyVisible ? "flex" : "none";
}

// ========== 14. Clear History ==========
function clearHistory() {
  localStorage.removeItem("searchHistory");
  document.getElementById("history").innerHTML = "";
}

// ========== 15. Form Submission ==========
document.getElementById("addGameForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("newGameName").value.trim();
  const img = document.getElementById("newGameImg").value.trim();
  const wiki = document.getElementById("newGameWiki").value.trim();

  if (name && img && wiki) {
    const newGame = { name, img, wiki };
    saveGame(newGame);
    renderGames();
    this.reset();
  }
});

// ========== 16. Timer ==========
let searchTimer;
function startSearchTimer() {
  clearInterval(searchTimer); // Stop any previous timer
  let searchSeconds = 0;
  searchTimer = setInterval(() => {
    searchSeconds++;
    const el = document.getElementById("searchTimer");
    if (el) el.textContent = `Search time: ${searchSeconds}s`;
  }, 1000);
}


// ========== 17. Cookies ==========
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return val;
  }
  return null;
}

// ========== 18. Cookie Welcome Message ==========
function showWelcomeMessage() {
  const lastVisit = getCookie("lastVisit");
  if (lastVisit) {
    alert("Welcome back! Last time you visited: " + lastVisit);
  } else {
    alert("Welcome to the Video Game Explorer!");
  }
  const now = new Date().toLocaleString();
  setCookie("lastVisit", now, 30);
}

// ========== 19. Live Search ==========
function handleLiveSearch(event) {
  startSearchTimer(); // Start timer when typing
  const searchTerm = event.target.value.trim().toLowerCase();
  const allGames = [...defaultGames, ...getStoredGames()];
  const filtered = allGames.filter(game =>
    game.name.toLowerCase().includes(searchTerm)
  );
  renderGames(filtered);
}


// ========== 20. Initialize Everything ==========
applyStoredTheme();
renderGames();
renderSearchHistory();
showWelcomeMessage();

document.getElementById("toggle-history").addEventListener("click", toggleHistory);
document.getElementById("clear-history").addEventListener("click", clearHistory);
document.getElementById("search").addEventListener("keydown", handleSearch);
document.getElementById("search").addEventListener("input", handleLiveSearch);

