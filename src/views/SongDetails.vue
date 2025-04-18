<template>
  <div class="song-details">
    <img :src="$route.query.artwork" alt="Artwork" class="artwork" />
    <h2>{{ title }} - {{ artist }}</h2>
    <audio v-if="$route.query.preview" :src="$route.query.preview" controls></audio>

    <div v-if="lyrics" class="lyrics">
      <h3>Paroles</h3>
      <pre>{{ lyrics }}</pre>
    </div>

    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else class="loading">⏳ Chargement des paroles...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lyrics: '',
      errorMessage: '',
    };
  },
  computed: {
    artist() {
      return this.$route.params.artist;
    },
    title() {
      return this.$route.params.title;
    },
  },
  async mounted() {
    const artist = this.artist;
    const title = this.title;
    // Debug logs for troubleshooting
    console.log('🔍 Fetching lyrics for:', artist, title);
    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
    console.log('📡 URL:', url);
    try {
      const res = await fetch(url);
      console.log('📶 HTTP status:', res.status, res.statusText);
      const data = await res.json();
      console.log('📥 API response:', data);
      if (data.lyrics) {
        this.lyrics = data.lyrics;
      } else {
        this.errorMessage = 'Paroles introuvables pour cette chanson.';
      }
    } catch (e) {
      console.error('Fetch error:', e);
      this.errorMessage = 'Erreur lors du chargement des paroles.';
    }
  },
};
</script>

<style scoped>
.song-details {
  padding: 2rem;
  text-align: center;
  color: #fff;
}

.artwork {
  width: 200px;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.lyrics {
  white-space: pre-wrap;
  text-align: left;
  background: #fff;
  color: #333;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.error {
  color: #ff6b6b;
  margin-top: 1rem;
}

.loading {
  color: #ccc;
  margin-top: 1rem;
}
</style>
