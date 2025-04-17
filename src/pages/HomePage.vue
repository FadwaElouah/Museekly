<template>
  <div class="home">
    <header class="header">
      <h1 class="title">🎵 Museekly 🎶</h1>
      <p class="subtitle">Trouve facilement les paroles de tes chansons préférées !</p>
    </header>

    <main class="main">
      <input
        v-model="search"
        type="text"
        placeholder="Entre le titre de la chanson ou le nom de l’artiste..."
        class="search-input"
      />
      <button class="search-btn" @click="searchLyrics">🔍 Rechercher</button>

      <!-- Affichage des paroles ici -->
      <div v-if="lyrics" class="lyrics">
        <h2>Paroles:</h2>
        <pre>{{ lyrics }}</pre>
      </div>

      <!-- Affichage message erreur si pas trouvé -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      lyrics: '',
      errorMessage: '',
    };
  },
  methods: {
    async searchLyrics() {
      // Split artist and title by " - "
      const [artist, title] = this.search.split(" - ");

      // If input is invalid
      if (!artist || !title) {
        this.errorMessage = "Merci d'écrire la chanson sous forme: artiste - titre.";
        this.lyrics = '';
        return;
      }

      try {
        // Fetch lyrics from the API
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();

        // If lyrics found, display them
        if (data.lyrics) {
          this.lyrics = data.lyrics;
          this.errorMessage = ''; // Clear any previous error
        } else {
          // If no lyrics found
          this.lyrics = '';
          this.errorMessage = "Désolé, les paroles n'ont pas été trouvées pour cette chanson.";
        }
      } catch (error) {
        this.errorMessage = "Erreur de connexion. Veuillez réessayer.";
        this.lyrics = '';
      }
    },
  },
};
</script>

<style scoped>
/* Your styles go here */
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #3b3b98);
  color: #fff;
  text-align: center;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.header .title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.header .subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #dcdcdc;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.search-input {
  padding: 0.8rem 1rem;
  width: 80%;
  max-width: 400px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
}

.search-btn {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  background-color: #ff7f50;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

.search-btn:hover {
  background-color: #ff5722;
}

/* Style for lyrics display */
.lyrics {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff;
  color: #333;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Style for error messages */
.error-message {
  margin-top: 2rem;
  color: red;
  font-size: 1.1rem;
}
</style>
