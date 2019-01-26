<template>
    <div>
        <slot></slot>
        <div v-for="pool in pools">
            <pool-card :description="pool.description"></pool-card>
        </div>
    </div>
</template>

<script>
    import Api from '../../api/Api';
    import PoolCard from "../card/PoolCard";
    export default {
        name: "ApiPools",
        components: {PoolCard},
        data(){
            return {
                pools:[]
            }
        },
        mounted(){
          new Api().getPools().then(pools=>{
              this.pools=pools.data
          })  
        }
    }
</script>

<style scoped>

</style>