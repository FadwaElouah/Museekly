<template>
  <div>
    <div v-if="lyrics" class="lyrics">
      <h2>Paroles:</h2>
      <pre>{{ lyrics }}</pre>
    </div>

    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lyrics', 'errorMessage']
};
</script>

<style scoped>
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

.error-message {
  margin-top: 2rem;
  color: red;
  font-size: 1.1rem;
}
</style>
<!-- src/components/SearchResults.vue -->
<template>
  <div class="results">
    <div v-if="isLoading">⏳ Recherche en cours...</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>

    <div v-if="songs.length">
      <div
        v-for="song in songs"
        :key="song.trackId"
        class="song-card"
        @click="goToSongDetails(song)"
      >
        <img :src="song.artworkUrl100" alt="Pochette d'album" />
        <div>
          <h3>{{ song.trackName }}</h3>
          <p>{{ song.artistName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchTerm'],
  data() {
    return {
      songs: [],
      isLoading: false,
      errorMessage: '',
    };
  },
  watch: {
    searchTerm: 'fetchSongs',
  },
  methods: {
    async fetchSongs() {
      if (!this.searchTerm) return;
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const res = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(
            this.searchTerm
          )}&entity=song&limit=10`
        );
        const data = await res.json();
        this.songs = data.results;
        if (!data.results.length) {
          this.errorMessage = '😕 Aucun résultat trouvé.';
        }
      } catch (err) {
        this.errorMessage = 'Erreur lors de la recherche.';
      } finally {
        this.isLoading = false;
      }
    },
    goToSongDetails(song) {
      this.$router.push({
        name: 'song-details',
        params: {
          artist: song.artistName,
          title: song.trackName,
        },
        query: {
          preview: song.previewUrl,
          artwork: song.artworkUrl100,
        },
      });
    },
  },
  mounted() {
    this.fetchSongs();
  },
};
</script>

<style scoped>
.results {
  margin-top: 20px;
}
.song-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.song-card:hover {
  background-color: #f0f0f0;
}
</style>


