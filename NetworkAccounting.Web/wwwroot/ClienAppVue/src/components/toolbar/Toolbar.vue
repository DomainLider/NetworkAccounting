<template lang="pug">
    .window
        vue-good-table(:columns="columns" :rows="networks" :search-options="{ enabled: true, skipDiacritics: true }")
</template>

<script>
  import Api from '../../api/Api';
  import {VueGoodTable} from 'vue-good-table';
  import _ from 'lodash';

  export default {
    components: {
      VueGoodTable
    },
    name: "ApiNetworks",
    data() {
      return {
        networks: [],
        statuses: ['Free','Busy','Parent'],
        pools: {},
        columns: [
          {
            label: 'Id',
            field: 'id',
          },
          {
            label: 'Network',
            field: 'address',
            type:'string',
            // filterOptions: {
            //   enabled: true, // enable filter for this column
            // },
          },
          {
            label: 'Size',
            field: 'size',
            type: 'number',
            // filterOptions: {
            //   enabled: true, // enable filter for this column
            // },
          },
          {
            label: 'Description',
            field: 'description',
          },
          {
            label: 'Status',
            field: this.getRowStatus,
            // filterOptions: {
            //   enabled: true, // enable filter for this column
            // },
            type: 'string'
          },
          {
            label: 'Pool',
            field: this.getRowPool,
            // type: 'number'
          },
          // {
          //   label: 'Created On',
          //   field: 'createdAt',
          //   type: 'date',
          //   dateInputFormat: 'YYYY-MM-DD',
          //   dateOutputFormat: 'MMM Do YY',
          // },
          // {
          //   label: 'Percent',
          //   field: 'score',
          //   type: 'percentage',
          // },
        ],
      }
    },
    mounted() {
      new Api().getNetworks().then(networks => {
        this.networks = _.values(networks.data);
      })
      new Api().getPools().then(pools => {
        this.pools = pools.data;
      })
    },
    methods:{
      getRowPool(rowObj){
        if (this.pools[rowObj.poolId]) return this.pools[rowObj.poolId].name;
        return rowObj.poolId;
      },
      getRowStatus(rowObj){
        return this.statuses[rowObj.status];
      }
    }
  }
</script>

<style lang="scss">
    @import '../../scss/window';
    .vgt-table td {
        padding: 5px;
    }
</style>