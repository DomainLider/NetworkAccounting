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
            el-main
                h1 Main
        el-footer.footer
            h5 Dmitry Ryabykin
</template>

<script>
  import * as EL from '../ui'

  export default {
    components: {
      ...EL
    },
    mounted() {
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
    
</style>
