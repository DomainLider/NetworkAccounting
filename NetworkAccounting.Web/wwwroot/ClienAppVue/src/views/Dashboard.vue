<template lang="pug">
    el-container(:style="{height:'100%'}")
        el-header.nav 
            .logo 
                el-row
                    el-col(:span="8")
                        h2 Network Accounting
                    el-col.p5(:span="16")    
                        el-button(size="mini") Networks
                        el-button(size="mini") Pools
                        el-button(size="mini") Statistics
                        el-button(type="success" size="mini") Logout
        el-container         
            el-aside
                nav-menu
            el-main
                network-grid(:networks="networks")
        el-footer.footer
            h5 Dmitry Ryabykin
</template>

<script>
  import * as EL from '../ui'
  import NetworkGrid from '../components/table/NetworkGrid';
  import Api from '../api/Api';
  import _ from 'lodash';
  import NavMenu from "../components/menu/NavMenu";
  export default {
    components: {
      NavMenu,
      ...EL,
      NetworkGrid
    },
    data(){
      return {
        networks:[
          
        ]
      }
    },
    mounted() {
      new Api().getNetworks().then(networks=>{
        this.networks=_.values(networks.data)
      })
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
    
    
    .p5 {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
    }
    
    
    //menu background rgba(73, 91, 117, 0.22)
    //menu text color #FFF
    //menu border #1c5c80 rgba(28,92,128,1)
</style>
