# Recipe Finder App 🍳

A simple web application to search recipes by ingredients using the Spoonacular API.
Users can view recipe images, ingredients, and cooking instructions with a convenient **Details** popup.

---

## Features

* Search recipes by ingredients (e.g., `tomato, onion`)
* View recipe details including:

  * Dish image
  * Ingredients list
  * Cooking instructions
* Recipes fetched securely through a backend server, keeping the API key hidden
* Responsive design and easy-to-use interface
---

## Project Structure

```
recipe-finder/
├─ index.html           # Frontend HTML
├─ script.js            # Frontend JavaScript
├─ style.css            # CSS styling
├─ server.js            # Node.js backend server
├─ package.json         # Project metadata & dependencies
├─ package-lock.json    # Auto-generated lock file
├─ .gitignore           # Files/folders to ignore in GitHub
└─ README.md            # Project documentation
```

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd recipe-finder
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in the project root

```
SPOONACULAR_KEY=your_api_key_here
```

> Replace `your_api_key_here` with your Spoonacular API key.
> **Do not push your real `.env` file** to GitHub. Use `.env.example` as a reference.

4. **Run the backend server**

```bash
node server.js
```

5. **Open the app in your browser**

```
http://localhost:3000/
```

6. **Use the search box**
   Enter ingredients (comma-separated) → click **Search Recipes** → click **Details** on any recipe to see full info.

---

## .gitignore

```
node_modules/
.env
.DS_Store
npm-debug.log*
.vscode/
.idea/
```

---

## Notes

* The frontend calls the backend API endpoints:

  * `/api/recipes?ingredients=...` → fetch recipes by ingredients
  * `/api/recipeInfo?id=...` → fetch detailed recipe info
* The backend handles the Spoonacular API key securely; the frontend **never exposes your API key**.
* You can further enhance the app with styling, modals, or deployment online (Vercel, Render, Heroku, etc.).

---

