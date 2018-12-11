
export default {
  namespace: 'forms',
  state: {
    leaseNetwork:false
  },
  reducers: {
    'open'(state,{payload}){
      return {[payload.form]:true};
    },
    'close'(state,{payload}){
      return {[payload.form]:false};
    }
  },
  effects:{
  },
  subscriptions:{
  }
};
