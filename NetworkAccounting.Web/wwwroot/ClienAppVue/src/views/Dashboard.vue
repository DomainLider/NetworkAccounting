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
                el-menu#side
                    el-menu-item(index="1")
                        i.el-icon-share
                        span Networks
                    el-menu-item(index="2")
                        i.el-icon-menu
                        span Pools
                    el-menu-item(index="3")
                        i.el-icon-setting
                        span Operations
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
    
    #side.el-menu {
        background-color: rgba(73, 91, 117, 0.22);
        border-color: #1c5c80;
        height: 100%;
        * {
            color: #FFF;
        }
        .el-menu-item {
            text-align: left;
            &:hover, &:active, &:focus {
                background-color: rgba(28,92,128,1);    
            }
        }
    }
    //menu background rgba(73, 91, 117, 0.22)
    //menu text color #FFF
    //menu border #1c5c80 rgba(28,92,128,1)
</style>
