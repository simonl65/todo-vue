<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: 'TodoRemaining',
  computed: {
    remaining() {
      return this.$store.getters.remaining
    }
  }
}
</script>
