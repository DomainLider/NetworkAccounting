<template>
    <div class="card">
        Network card
        {{ address }}
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NetworkCard",
        props:['address']
    }
</script>

<style scoped lang="scss">
    @import "../../scss/color";
    @import "../../scss/layout";
    
    
</style>