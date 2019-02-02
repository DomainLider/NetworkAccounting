<template lang="pug">
    el-dialog(title="New pool" :visible="visible")
        el-form(label-width="200px")
            el-form-item(label="Name")
                el-input(v-model="form.name")
            el-form-item(label="Description")
                el-input(v-model="form.description")
            el-form-item
                el-button(size="mini" @click="$emit('onClose')") Cancel
                el-button(size="mini" @click="addPool") Add
</template>

<script>
  import BusApi from '../bus/BusApi';
  
  export default {
    props:['visible'],
    name: "",
    data(){
      return {
        form:{
          name:"New pool",
          description:null
        }
      }
    },
    mounted(){
      BusApi.$on(BusApi.events.POST_ADD_POOL_OK,
        (pool)=>{
        debugger;
          this.$notify({
            title: 'Pool add',
            message: `New pool: ${pool.name}`,
            type: 'success',
            duration: 0
          });
          BusApi.$emit(BusApi.events.GET_POOLS);
          this.$emit('onClose');
        }
      );
    },
    beforeDestroy(){
      BusApi.$off(BusApi.events.POST_ADD_POOL_OK);
    },
    methods:{
      addPool(){
        BusApi.$emit(BusApi.events.POST_ADD_POOL,this.form);
      }
    },
  }
</script>

<style scoped>

</style>