<template>
    <div>
        <slot></slot>
        <div v-for="network in networks">
            <!--{{ network }}-->
            <network-card :address="network.address"></network-card>
        </div>
    </div>
</template>

<script>
    import Api from '../../api/Api';
    import NetworkCard from "../card/NetworkCard";
    export default {
        name: "ApiNetworks",
        components: {NetworkCard},
        data(){
            return {
                networks:[]
            }
        },
        mounted(){
          new Api().getNetworks().then(networks=>{
              this.networks=networks.data
          })  
        }
    }
</script>

<style scoped>

</style>