<template lang="pug">
    el-container(:style="{height:'100%'}")
        el-header.nav 
            .logo 
                el-row
                    el-col(:span="8")
                        h2 Network Accounting
                    el-col.p5(:span="16")    
                        el-button(type="success" size="mini") Logout
        el-container         
            el-aside.w200
                nav-menu
            el-main
                .button-menu
                    el-button-group
                        el-button(size="mini" icon="el-icon-circle-plus" @click="dialogPoolAdd=true") Add Pool
                        el-button(size="mini" icon="el-icon-circle-plus" @click="removePools") Remove pool
                pool-grid(:pools="pools" @onSelectionChange="onSelectionPool")
                pool-add(:visible="dialogPoolAdd" @onClose="dialogPoolAdd=false")
        el-footer.footer
            h5 Dmitry Ryabykin
</template>

<script>
  import BusApi from '../bus/BusApi';
  
  import * as EL from '../ui'
  import PoolAdd from '../forms/PoolAdd';
  import _ from 'lodash';
  import NavMenu from "../components/menu/NavMenu";
  import PoolGrid from "../components/table/PoolGrid";
  export default {
    components: {
      PoolGrid,
      NavMenu,
      ...EL,
      PoolAdd
    },
    data(){
      return {
        pools:{},
        selectedPools:[],
        dialogPoolAdd:false,
        dialogNetworkAdd:false,
      }
    },
    methods:{
      updateNetworks(){
        BusApi.Combine(BusApi.events.GET_NETWORKS,BusApi.events.GET_POOLS);
      },
      
      removePools(){
        if (this.selectedPools.length>0){
          this.$confirm(`This will ${this.selectedPools.length} pools removed. Continue?`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
            .then(() => {
              for (const poolId of this.selectedPools)
                BusApi.$emit(BusApi.events.DELETE_POOL, poolId);
              this.selectedPools=[];
            });
        } 
      },
      
      onSelectionPool(pools){
        this.selectedPools = pools;
      }
    },
    mounted() {
      BusApi.$on(BusApi.events.DATA_NETWORKS,(networks)=>{
        this.networks=_.values(networks).filter(d=>d.status!==2);
      });
      BusApi.$on(BusApi.events.DATA_POOLS,(pools)=>{
        this.pools=pools;
      });
      BusApi.$on(BusApi.events.ERROR,(error)=>{
        this.$notify({
          title: 'Error',
          message: `Error: ${error.message}`,
          type: 'error',
          duration: 0
        });
      });
      this.updateNetworks();
    },
    beforeDestroy(){
      BusApi.$off(BusApi.events.DATA_NETWORKS);
      BusApi.$off(BusApi.events.DATA_POOLS);
      BusApi.$off(BusApi.events.ERROR);
    }
  }
</script>

<style lang="scss">
    .nav {
        background: url(../../src/assets/background/bg2.jpg) no-repeat top center;
        border-bottom: 1px solid #1c5c80;
    }
    
    .footer {
        background: url(../../src/assets/background/bg2.jpg) no-repeat top center;
        border-top: 1px solid #1c5c80;
        color: #cbcbcb;
        text-align: right;
    }
    
    .logo {
        color: #cbcbcb;
    }
    
    .el-main {
        padding: 0px 2px !important;    
    }
    
    .button-menu {
        padding:3px;
        display:flex;
    }
    .p5 {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
    }
    .w200 {
        width:200px !important;
    }
    
    //menu background rgba(73, 91, 117, 0.22)
    //menu text color #FFF
    //menu border #1c5c80 rgba(28,92,128,1)
</style>
