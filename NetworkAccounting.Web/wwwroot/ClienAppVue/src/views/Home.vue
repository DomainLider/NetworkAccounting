<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <api-networks>
    </api-networks>
    <api-pools></api-pools>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiNetworks from "../components/data/ApiNetworks";
import ApiPools from "../components/data/ApiPools"; // @ is an alias to /src

@Component({
  components: {
      ApiPools,
      ApiNetworks,
  },
})
export default class Home extends Vue {
}
</script>
