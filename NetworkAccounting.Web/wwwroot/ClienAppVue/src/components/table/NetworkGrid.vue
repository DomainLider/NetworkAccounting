<template lang="pug">
    el-table(style="width:100%" :data="networks")
        el-table-column(prop="address" label="Address")
        el-table-column(prop="size" label="Size")
        el-table-column(prop="description" label="Description")
        el-table-column(prop="parent" label="Parent")
        el-table-column(prop="status" label="Status")
        el-table-column(prop="poolId" label="Pool")
</template>

<script>
  import EL from '../../ui';  
  export default {
    components:{...EL},
    props:['networks'],
    name: "NetworkGrid"
  }
</script>

<style lang="scss">
    .el-table {
        background-color: rgba(0,0,0,0) !important;
        tr {
            color: #F2CE79;
            background-color: rgba(0,0,0,0) !important;
        }
        td {
            padding: 2px !important;
        }
    }
</style>