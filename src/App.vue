<template>
  <div>
    <component :is="layout"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    layout: null
  }),
  watch: {
    "$route.meta.layout": {
      immediate: true,
      handler() {
        this.layout = this.$route.meta.layout;
      }
    }
  }
}
</script>
