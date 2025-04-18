<template>
  <div class="home">
    <header class="header">
      <h1 class="title">🎵 Museekly 🎶</h1>
      <p class="subtitle">Trouve facilement les paroles de tes chansons préférées...</p>
    </header>

    <main class="main">
      <!-- Ici, on insère SearchBar et on lui passe "disabled" et "v-model" -->
      <SearchBar
        v-model="search"
        :disabled="isLoading"
        @search="searchLyrics"
      />

      <!-- Affichage des résultats -->
      <SearchResults
        :lyrics="lyrics"
        :errorMessage="errorMessage"
      />
    </main>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import SearchResults from '../components/SearchResults.vue';

export default {
  components: { SearchBar, SearchResults },
  data() {
    return {
      search: '',
      lyrics: '',
      errorMessage: '',
      isLoading: false,    // ← État de chargement
    };
  },
  methods: {
    async searchLyrics() {
      this.isLoading = true;    // ← Début du chargement
      this.errorMessage = '';
      this.lyrics = '';

      const [artist, title] = this.search.split(' - ');
      if (!artist || !title) {
        this.errorMessage = 'Tu dois écrire : artiste - titre de la chanson';
        this.isLoading = false;  // ← Fin du chargement
        return;
      }

      try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();
        if (data.lyrics) {
          this.lyrics = data.lyrics;
        } else {
          this.errorMessage = 'Paroles introuvables pour cette chanson.';
        }
      } catch (e) {
        this.errorMessage = 'Problème de connexion, réessaie plus tard.';
      }

      this.isLoading = false;   // ← Fin du chargement
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1e1e2f, #3b3b98);
  color: #fff;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.header .title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.header .subtitle {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #dcdcdc;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
