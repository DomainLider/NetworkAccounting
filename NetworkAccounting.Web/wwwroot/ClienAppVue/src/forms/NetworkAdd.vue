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
    import Api from '../api/Api';
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
      methods:{
          addNetwork(){
            const poolId=this.form.pool;
            const a=this.form.address.split('/');
            if (a.length!==2) return;
            const [address,size]=a;
            new Api().addNetwork({address,size,poolId}).then(
              (network)=>{
                debugger;
                this.$notify({
                  title: 'Network add',
                  message: `New network: ${network.address}/${network.size}`,
                  type: 'success',
                  duration: 0
                });
                this.$emit('onClose');
              }
            )
            
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