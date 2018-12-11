

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {
      forms:{
        addNetwork:false
      },
      poolList:{
        pools:[]
      },
    },
  },
};

