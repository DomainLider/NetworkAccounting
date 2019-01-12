<template>
    <div class="card">
        Network card
        {{ description }}
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PoolCard",
        props:['description']
    }
</script>

<style scoped lang="scss">
    @import "../../scss/color";
    @import "../../scss/layout";
    
    .card {
        @include px1();
        background-color: $bg_card;
        color:white;
        &:hover {
            background-color: $bg_card_hover;
        }
    }
</style>