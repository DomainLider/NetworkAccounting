<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <lease-network>
      <network-card address="HHH"></network-card>
    </lease-network>
    
    <!--<api-networks>-->
    <!--</api-networks>-->
    <!--<api-pools>-->
      <!---->
    <!--</api-pools>-->
    <!--<network-card address="192.121.22.22"/>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore
import NetworkCard from "../components/card/NetworkCard";
// @ts-ignore
import ApiNetworks from "../components/data/ApiNetworks";
// @ts-ignore
import ApiPools from "../components/data/ApiPools"; // @ is an alias to /src
// @ts-ignore
import LeaseNetwork from "../forms/LeaseNetwork";
@Component({
  components: {
      NetworkCard,
      ApiPools,
      ApiNetworks,
      LeaseNetwork
  },
})
export default class Home extends Vue {
}
</script>
