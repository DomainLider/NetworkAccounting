<template lang="pug">
    el-dialog(title="New network" :visible="visible")
        el-form(label-width="200px")
            el-form-item(label="Address")
                el-input(v-model="form.address")
            el-form-item(label="Pool")
                el-select(v-model="form.pool" placeholder="please select your zone")
                    el-option(v-for="pool in _pools" :label="pool.description" :value="pool.id")
            el-form-item
                el-button(size="mini" @click="$emit('onClose')") Cancel
                el-button(size="mini" @click="addNetwork") Add
</template>

<script>
    import * as EL from '../ui';
    import _ from 'lodash';
    import BusApi from '../bus/BusApi';
    
    export default {
        props:['visible','pools'],
        components: { ...EL },
        name: "",
        data(){
          return {
            form:{
              address:'192.168.0.0/24',
              pool:null,
            }
          }
        },
      mounted(){
          BusApi.$on(BusApi.events.POST_ADD_NETWORK_OK,
            (network)=>{
              this.$notify({
                title: 'Network add',
                message: `New network: ${network.address}/${network.size}`,
                type: 'success',
                duration: 0
              });
              BusApi.$emit(BusApi.events.GET_NETWORKS);
              this.$emit('onClose');
            }
          );
      },
      beforeDestroy(){
        BusApi.$off(BusApi.events.POST_ADD_NETWORK_OK);
      },
      methods:{
          addNetwork(){
            const poolId=this.form.pool;
            const a=this.form.address.split('/');
            if (a.length!==2) return;
            const [address,size]=a;
            BusApi.$emit(BusApi.events.POST_ADD_NETWORK,{address,size,poolId});
          }
      },
      computed:{
          _pools(){
            return _.values(this.pools);
          },
      }
    }
</script>

<style scoped lang="scss">
    @import "../scss/form";
</style>