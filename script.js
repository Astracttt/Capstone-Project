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


      if (!defaultGames.find(g => g.name === game.name)) {
        const delBtn = document.createElement("button");
        delBtn.textContent = "×";
        delBtn.onclick = () => deleteGame(game.name);
        card.appendChild(delBtn);
      }

      container.appendChild(card);
    });

    document.getElementById("gameCount").textContent = `Games Displayed: ${gamesToShow.length}`;
  }

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


  function handleSearch(event) {
    if (event.key === "Enter") {
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

  function resetSearch() {
    document.getElementById("search").value = "";
    renderGames();
  }

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

  let historyVisible = true;

function toggleHistory() {
const historyEl = document.getElementById("history");
historyVisible = !historyVisible;
historyEl.style.display = historyVisible ? "flex" : "none";
}

function clearHistory() {
localStorage.removeItem("searchHistory");
document.getElementById("history").innerHTML = "";
}


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

  // Initialize app
  applyStoredTheme();
  renderGames();
  renderSearchHistory();

  // Link toggle and clear history buttons to their functions
document.getElementById("toggle-history").addEventListener("click", toggleHistory);
document.getElementById("clear-history").addEventListener("click", clearHistory);
function handleLiveSearch(event) {
const searchTerm = event.target.value.trim().toLowerCase();
const allGames = [...defaultGames, ...getStoredGames()];
const filtered = allGames.filter(game =>
  game.name.toLowerCase().includes(searchTerm)
);
renderGames(filtered);
}
