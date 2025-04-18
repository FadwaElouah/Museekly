<template>
  <div class="home-container">
    <div class="home-header">
      <h1 class="home-title">🎵 Museekly 🎶</h1>
      <p class="home-subtitle">Trouve facilement les paroles de tes chansons préférées...</p>
    </div>

    <div class="home-main">
      <SearchBar
        v-model="search"
        :disabled="isLoading"
        @search="searchLyrics"
        class="search-bar"
      />

      <SearchResults :searchTerm="search" class="search-results"/>

      <LyricsDisplay
        :lyrics="lyrics"
        :errorMessage="errorMessage"
        class="lyrics-display"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import SearchResults from '../components/SearchResults.vue';
import LyricsDisplay from '../components/LyricsDisplay.vue';

export default {
  components: { SearchBar, SearchResults, LyricsDisplay },
  data() {
    return {
      search: '',
      lyrics: '',
      errorMessage: '',
      isLoading: false
    };
  },
  methods: {
    async searchLyrics() {
      this.isLoading = true;
      this.errorMessage = '';
      this.lyrics = '';

      const [artist, title] = this.search.split(' - ');
      if (!artist || !title) {
        this.errorMessage = 'Tu dois écrire : artiste - titre de la chanson';
        this.isLoading = false;
        return;
      }

      try {
        const res = await fetch(
          `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
        );
        const data = await res.json();
        if (data.lyrics) this.lyrics = data.lyrics;
        else this.errorMessage = 'Paroles introuvables pour cette chanson.';
      } catch {
        this.errorMessage = 'Problème de connexion, réessaie plus tard.';
      }

      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.home-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(30, 30, 47, 0.8);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.home-header {
  text-align: center;
  margin-bottom: 2rem;
}

.home-title {
  font-size: 3rem;
  margin: 0;
  color: #ff7f50;
}

.home-subtitle {
  font-size: 1.3rem;
  margin: 0.5rem 0;
  color: #dcdcdc;
}

.home-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-bar {
  display: flex;
  justify-content: center;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
}

.lyrics-display {
  margin-top: 1rem;
}
</style>