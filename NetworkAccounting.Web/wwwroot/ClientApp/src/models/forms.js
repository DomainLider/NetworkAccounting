import {leaseNetworkState,setLeasedNetwork,clearLeasedNetwork} from "../forms/leaseNetwork";
import update from 'immutability-helper';

export default {
  namespace: 'forms',
  state: {
    leaseNetwork: leaseNetworkState
  },
  reducers: {
    'open'(state,{payload}){
      return update(state,{[payload.form]:{visible:{$set:true}}});
    },
    'close'(state,{payload}){
      return update(state,{[payload.form]:{visible:{$set:false}}});
    },
    setLeasedNetwork,
    clearLeasedNetwork
  },
  effects:{
  },
  subscriptions:{
  }
};
