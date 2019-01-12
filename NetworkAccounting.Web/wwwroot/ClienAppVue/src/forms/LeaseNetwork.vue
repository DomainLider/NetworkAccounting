<template lang="pug">
    .form 
        .form_header Header
        .form_body Body
        slot
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped lang="scss">
    @import "../scss/form";
</style>