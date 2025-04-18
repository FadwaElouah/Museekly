<template>
  <div class="song-details">
    <img :src="$route.query.artwork" alt="Artwork" class="artwork" />
    <h2>{{ title }} - {{ artist }}</h2>
    <audio :src="$route.query.preview" controls></audio>

    <div v-if="lyrics" class="lyrics">
      <h3>Paroles</h3>
      <pre>{{ lyrics }}</pre>
    </div>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
    try {
      const res = await fetch(
        `https://api.lyrics.ovh/v1/${this.artist}/${this.title}`
      );
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
  color: red;
  margin-top: 1rem;
}
</style>
