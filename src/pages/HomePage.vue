<template>
  <div class="home">
    <header class="header">
      <h1 class="title">🎵 Museekly 🎶</h1>
      <p class="subtitle">Trouve facilement les paroles de tes chansons préférées !</p>
    </header>

    <main class="main">
      <SearchBar v-model="search" @search="searchLyrics" />
      <SearchResults :lyrics="lyrics" :errorMessage="errorMessage" />
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
    };
  },
  methods: {
    async searchLyrics() {
      const [artist, title] = this.search.split(' - ');

      if (!artist || !title) {
        this.errorMessage = "Merci d'écrire la chanson sous forme: artiste - titre.";
        this.lyrics = '';
        return;
      }

      try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();

        if (data.lyrics) {
          this.lyrics = data.lyrics;
          this.errorMessage = '';
        } else {
          this.lyrics = '';
          this.errorMessage = "Désolé, les paroles n'ont pas été trouvées pour cette chanson.";
        }
      } catch (error) {
        this.errorMessage = "Erreur de connexion. Veuillez réessayer.";
        this.lyrics = '';
      }
    }
  }
};
</script>

<style scoped>
/* Styles comme avant */
.home {
  min-height: 100vh;
  width: 1200px;
  background: linear-gradient(135deg, #1e1e2f, #3b3b98);
  color: #fff;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 auto;
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
</style>
