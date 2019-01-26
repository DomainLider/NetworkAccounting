<template lang="pug">
    el-container(:style="{height:'100%'}")
        el-header.nav 
            .logo 
                el-row
                    el-col(:span="8")
                        h2 Network Accounting
                    el-col.p5(:span="16")    
                        <!--el-button(size="mini") Networks-->
                        <!--el-button(size="mini") Pools-->
                        <!--el-button(size="mini") Statistics-->
                        el-button(type="success" size="mini") Logout
        el-container         
            el-aside.w200
                nav-menu
            el-main
                .button-menu
                    el-button-group
                        el-button(size="mini" icon="el-icon-circle-plus" @click="dialogLeaseNetwork=true") New lease
                        el-button(size="mini" icon="el-icon-circle-plus" @click="dialogNetworkAdd=true") Add network
                        <!--el-button(size="mini" icon="el-icon-edit") Add pool-->
                        el-button(size="mini" icon="el-icon-circle-minus") Export
                        el-button(size="mini" icon="el-icon-circle-minus") Import
                        el-button(size="mini" icon="el-icon-circle-close") Find
                network-grid(:networks="networks" :pools="pools" @releaseNetwork="releaseNetwork")
                network-lease(:visible="dialogLeaseNetwork" @onClose="dialogLeaseNetwork=false" :networks="networks" :pools="pools")
                network-add(:visible="dialogNetworkAdd" @onClose="dialogNetworkAdd=false" :pools="pools")
        el-footer.footer
            h5 Dmitry Ryabykin
</template>

<script>
  import * as EL from '../ui'
  import NetworkGrid from '../components/table/NetworkGrid';
  import NetworkLease from '../forms/NetworkLease';
  import NetworkAdd from '../forms/NetworkAdd';
  import Api from '../api/Api';
  import _ from 'lodash';
  import NavMenu from "../components/menu/NavMenu";
  export default {
    components: {
      NavMenu,
      ...EL,
      NetworkGrid,
      NetworkLease,
      NetworkAdd,
    },
    data(){
      return {
        form:{
          size:24,
          description:'New network'
        },
        networks:[
          
        ],
        pools:{},
        dialogLeaseNetwork:false,
        dialogNetworkAdd:false,
      }
    },
    methods:{
      releaseNetwork(id){
        const _this=this;
        this.$confirm('This will network release. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(()=>{
            return new Api().releaseNetwork(id);  
        })
        .then(()=>{
          _this.updateNetworks();
        })
      },
      
      updateNetworks(){
        new Api().getNetworks().then(networks=>{
          this.networks=_.values(networks.data).filter(d=>d.status!==2);
        });
      }
    },
    mounted() {
      this.updateNetworks();
      new Api().getPools().then(pools=>this.pools=pools.data);
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
