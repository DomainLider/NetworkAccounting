<template lang="pug">
    .ddd
        el-table(style="width:100%" :data="networks" height="100%")
            el-table-column(prop="address" label="Address" sortable)
            el-table-column(prop="size" label="Size" sortable)
            el-table-column(prop="description" label="Description" sortable)
            el-table-column(prop="parent" label="Parent")
            el-table-column(prop="status" label="Status" :formatter="formatStatus")
            el-table-column(prop="poolId" label="Pool"  :formatter="formatPool")
            el-table-column(fixed="right" label="Operations" width="100")
                template(slot-scope="scope")
                    el-button( size="mini" v-if="scope.row.status===0") Lease
                    el-button( size="mini" type="warning" v-else-if="scope.row.status===2") Release
        network-lease(:visible="true")        
</template>

<script>
  import EL from '../../ui';
  import NetworkLease from '../form/NetworkLease';
  
  const statuses = ['Free','Parent','Busy'];
  export default {
    components:{...EL, NetworkLease},
    props:['networks','pools'],
    name: "NetworkGrid",
    methods:{
      formatPool(row,column){
        if (this.pools){
          //return this.pools[row.poolId].description;
        }
        return row.poolId;
      },
      formatStatus(row,column){
        return statuses[row.status];
      }
    }
  }
</script>

<style lang="scss">
    .el-table {
        /*background-color: rgba(0,0,0,0) !important;*/
        th {
            padding: 2px !important;
            background: linear-gradient(to top,rgba(100,100,100,1),rgba(28,98,192,0.4),#ABF) !important;
            color: #FFF !important;
        }
        tr {
            /*color: #F2CE79;*/
            /*background-color: rgba(0,0,0,0) !important;*/
        }
        td {
            padding: 2px !important;
        }
    }
</style>