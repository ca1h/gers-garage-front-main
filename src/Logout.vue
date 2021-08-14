<template><div></div></template>
<script>
export default {
  created() {
    this.$auth.logout();
    // this.$router.push('/')
  }
}
</script>
