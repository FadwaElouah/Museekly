<template>
  <div class="song-details-container">
    <div class="song-header">
      <img :src="$route.query.artwork" alt="Artwork" class="artwork" />
      <div class="song-info">
        <h2 class="song-title">{{ title }}</h2>
        <p class="artist-name">{{ artist }}</p>
        <audio v-if="$route.query.preview" :src="$route.query.preview" controls class="audio-player"></audio>
      </div>
    </div>

    <div v-if="lyrics" class="lyrics-box">
      <h3 class="lyrics-heading">Paroles</h3>
      <pre class="lyrics-text">{{ lyrics }}</pre>
    </div>

    <div v-else-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else class="loading-message">⏳ Chargement des paroles...</div>
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
    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.lyrics) {
        this.lyrics = data.lyrics;
      } else {
        this.errorMessage = 'Paroles introuvables pour cette chanson.';
      }
    } catch (e) {
      this.errorMessage = 'Erreur lors du chargement des paroles.';
    }
  },
};
</script>

<style scoped>
.song-details-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  background: rgba(30, 30, 47, 0.8);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.song-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.artwork {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5);
}

.song-info {
  flex: 1;
}

.song-title {
  font-size: 2.5rem;
  margin: 0;
  color: #ff7f50;
}

.artist-name {
  font-size: 1.2rem;
  margin: 0.2rem 0 1rem;
  color: #dcdcdc;
}

.audio-player {
  width: 100%;
  outline: none;
  margin-top: 0.5rem;
}

.lyrics-box {
  background: #fff;
  color: #333;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.lyrics-heading {
  margin-top: 0;
  font-size: 1.8rem;
  border-bottom: 2px solid #ff7f50;
  padding-bottom: 0.5rem;
  color: #1e1e2f;
}

.lyrics-text {
  margin-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
}

.error-message {
  background: #ff4f4f;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #ccc;
  padding: 1rem;
}
</style>
