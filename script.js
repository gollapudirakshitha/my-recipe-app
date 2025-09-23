const searchBtn = document.getElementById("searchBtn");
const recipesDiv = document.getElementById("recipes");
const msg = document.getElementById("msg");

function showMsg(text) {
  msg.textContent = text;
}

function escapeHtml(s) {
  return (s + '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}

// Fetch recipes from backend
async function fetchRecipes(ingredients) {
  const url = `/api/recipes?ingredients=${encodeURIComponent(ingredients)}&number=8`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

// Fetch detailed recipe info from backend
async function fetchRecipeDetails(id) {
  const url = `/api/recipeInfo?id=${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

// Render recipe cards
function renderRecipes(list) {
  recipesDiv.innerHTML = "";
  if (!list || list.length === 0) {
    recipesDiv.innerHTML = "<p style='grid-column:1/-1;text-align:center'>No recipes found.</p>";
    return;
  }
  list.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${r.image}" alt="${escapeHtml(r.title)}" />
      <h3>${escapeHtml(r.title)}</h3>
      <p>Used: ${r.usedIngredientCount} • Missing: ${r.missedIngredientCount}</p>
      <div class="card-footer">
        <a class="small-btn" target="_blank" rel="noopener"
           href="https://spoonacular.com/recipes/${encodeURIComponent(r.title.replace(/\s+/g,'-'))}-${r.id}">
           View on Spoonacular
        </a>
        <button class="small-btn primary" data-id="${r.id}">Details</button>
      </div>
    `;
    recipesDiv.appendChild(card);
  });
}

// Handle search button click
searchBtn.addEventListener("click", async () => {
  const input = document.getElementById("ingredients").value.trim();
  if (!input) { showMsg("Please enter at least one ingredient."); return; }
  showMsg("Searching...");
  recipesDiv.innerHTML = "";
  try {
    const data = await fetchRecipes(input);
    renderRecipes(data);
    showMsg(`Found ${data.length} recipes`);
  } catch (err) {
    console.error(err);
    showMsg("Error fetching recipes. Check console / backend.");
  }
});

// Handle click on Details buttons
recipesDiv.addEventListener("click", async (e) => {
  if (e.target.matches("button[data-id]")) {
    const id = e.target.getAttribute("data-id");
    showMsg("Loading recipe details...");
    try {
      const info = await fetchRecipeDetails(id);
      // Simple modal / alert
      alert(`${info.title}\nServings: ${info.servings}\nReady in: ${info.readyInMinutes} min\n\nSource: ${info.sourceUrl}`);
      showMsg("");
    } catch (err) {
      console.error(err);
      showMsg("Could not load recipe details.");
    }
  }
});
