<template lang="pug">
        el-table(style="width:100%" :data="networks" height="100%" :row-class-name="classRow")
            el-table-column(prop="address" label="Address" :formatter="formatAddress" sortable)
            el-table-column(prop="description" label="Description" sortable)
            el-table-column(prop="status" label="Status")
                template(slot-scope="scope")
                    el-tag(size="mini") {{ formatStatus(scope.row) }}
            el-table-column(prop="poolId" label="Pool")
                template(slot-scope="scope")
                    el-tag(size="mini") {{ formatPool(scope.row) }}
            el-table-column(fixed="right" label="Operations" width="100")
                template(slot-scope="scope")                 
                    el-button( size="mini" type="warning" v-if="scope.row.status===1" @click="releaseNetwork(scope.row)") Release
                    span(v-else) &nbsp
</template>

<script>
  import EL from '../../ui';
  
  const statuses = ['Free','Busy','Parent'];
  export default {
    components:{...EL },
    props:['networks','pools'],
    name: "NetworkGrid",
    methods:{
      classRow(row,rowIndex){
        if (row.row.status===0) return "network-free";
        return "network-busy";
      },
      formatAddress(row,column){
        return `${row.address}/${row.size}`;
      },
      formatPool(row,column){
        if (row.poolId in this.pools){
            return this.pools[row.poolId].description||this.pools[row.poolId].name;
        }
        return row.poolId;
      },
      formatStatus(row,column){
        return statuses[row.status];
      },
      
      releaseNetwork(network){
        this.$emit('releaseNetwork',network.id)
      }
    }
  }
</script>

<style lang="scss">
    .el-table {
        /*background-color: rgba(0,0,0,0) !important;*/
        th {
            padding: 2px !important;
            background-color: rgba(28, 92, 128, 1) !important;
            /*background: linear-gradient(to top, rgb(51, 81, 100),rgba(28,98,192,0.4), #767eff) !important;*/
            color: #FFF !important;
        }
        tr {
            /*color: #F2CE79;*/
            /*background-color: rgba(0,0,0,0) !important;*/
            &.network-free {
                background: linear-gradient(to right, rgba(54, 128, 70, 0.2),rgba(54, 128, 70,0.4)),url(../../assets/background/tr_template7.png) repeat top center;
                /*background-color: rgba(0, 175, 0, 0.34) !important;*/
            }
            &.network-busy {
                background-color: rgba(184, 132, 29, 0.29) !important;
            }
        }
        td {
            line-height:20px !important;
            padding: 2px !important;
        }
    }
</style>