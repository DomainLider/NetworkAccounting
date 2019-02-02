<template lang="pug">
        el-table(style="width:100%" :data="_pools" height="100%" @selection-change="handleSelectionChange")
            el-table-column(type="selection" width="55")
            el-table-column(prop="id" label="id" sortable)
            el-table-column(prop="name" label="Name")
            el-table-column(prop="description" label="Description" sortable)
            el-table-column(label="Networks" sortable)     
</template>

<script>
  import EL from '../../ui';
  import _ from 'lodash';
  
  export default {
    components:{...EL },
    props:['pools'],
    name: "PoolGrid",
    methods:{
      handleSelectionChange(val){
        this.$emit('onSelectionChange',val.map(v=>v.id));
      }
    },
    computed:{
      _pools(){ return _.values(this.pools) }
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