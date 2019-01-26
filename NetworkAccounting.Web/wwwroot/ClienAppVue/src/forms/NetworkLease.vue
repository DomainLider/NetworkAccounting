<template lang="pug">
    el-dialog(title="New lease" :visible="visible")
        el-form(label-width="200px")
            el-form-item(label="Size")
                el-input(v-model="form.size")
            el-form-item(label="Pool")
                el-select(v-model="form.pool" placeholder="please select your zone")
                    el-option(v-for="pool in _pools" :label="pool.description" :value="pool.id")
            el-form-item(label="Specific network")
                el-select(v-model="form.id" placeholder="please select your parent")
                    el-option(v-for="network in _specificNetwork" :label="`${network.address}/${network.size}`" :value="network.id")
            el-form-item(label="Description")
                el-input(v-model="form.description")
            el-form-item
                el-button(size="mini" @click="$emit('onClose')") Cancel
                el-button(size="mini" @click="leaseNetwork") Lease
</template>

<script>
    import * as EL from '../ui';
    import _ from 'lodash';
    import Api from '../api/Api';
    export default {
        props:['visible','networks','pools'],
        components: { ...EL },
        name: "",
        data(){
          return {
            form:{
              size:24,
              description:'New network',
              pool:null,
              id:null
            }
          }
        },
      methods:{
          leaseNetwork(){
            const request=(this.form.id===null)?
                new Api().getFreeNetwork({size:this.form.size,poolId:this.form.pool,fromId:this.form.id})
              :Promise.resolve(this.form.id);
            
            request.then(id=>{
              debugger;
              return new Api().leaseNetwork({id:id,description:this.form.description}) 
            }).then(
              (network)=>{
                this.$notify({
                  title: 'Network lease',
                  message: `Lease network: ${network.address}/${network.size}`,
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
          _specificNetwork(){
            return this.networks.filter(n=>n.status===0&&
              (this.form.size===null||n.size<=this.form.size)&&
              (this.form.pool===n.poolId)               
            );
          }
      }
    }
</script>

<style scoped lang="scss">
    @import "../scss/form";
</style>