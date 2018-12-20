

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {
      forms:{
        leaseNetwork:{
          visible:false
        },
        crudPool:{
          visible:false
        }
      },
      poolList:{
        pools:[]
      },
    },
  },
};

