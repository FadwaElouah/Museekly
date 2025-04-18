<template>
  <div class="search-bar">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('search')"
      type="text"
      placeholder="Exemple: Adele - Hello"
      class="search-input"
      :disabled="disabled"
    />
    <button
      class="search-btn"
      @click="$emit('search')"
      :disabled="disabled"
    >
      🔍 Rechercher
    </button>
    <button
      v-if="modelValue"
      class="clear-btn"
      @click="$emit('update:modelValue','')"
      title="Supprimer"
    >✖</button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    disabled: Boolean,    
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
}

.search-btn {
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  background: #ff7f50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
}
</style>
