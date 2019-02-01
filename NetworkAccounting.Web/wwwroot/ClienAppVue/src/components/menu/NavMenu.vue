<template lang="pug">
    el-menu#side
        el-menu-item(index="1" @click="$router.push('/')")
            i.el-icon-share
            span Networks
        el-menu-item(index="2" @click="$router.push('/pools')")
            i.el-icon-menu
            span Pools
        el-menu-item(index="3")
            i.el-icon-setting
            span Operations
</template>

<script>
  import EL from '../../ui';

  export default {
    components: {...EL},
    name: "NavMenu"
  }
</script>

<style lang="scss">
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
                background-color: rgba(28, 92, 128, 1);
            }
        }
    }
</style>