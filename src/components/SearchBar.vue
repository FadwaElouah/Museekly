<template>
  <div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Entre le titre de la chanson ou le nom de l’artiste..."
      class="search-input"
    />
    <button class="search-btn" @click="$emit('search')">🔍 Rechercher</button>
  </div>
</template>

<script>
export default {
  props: ['modelValue']
};
</script>

<style scoped>

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
  margin-top: 20px;
}


.search-btn:hover {
  background-color: #ff5722;
}
</style>
