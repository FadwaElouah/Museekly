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
