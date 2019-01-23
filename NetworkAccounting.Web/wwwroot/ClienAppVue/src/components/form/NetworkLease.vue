<template lang="pug">
    .form(v-if="visible")
        h1 Form lease
</template>

<script>
  export default {
    name: "",
    props:['visible']
  }
</script>

<style lang="scss">
    .form {
        position: fixed;
        left:40%;
        right:40%;
        top:40%;
        bottom:40%;
        background-color: green;
    }
</style>