import {crudPoolState} from "../forms/crudPool";
import update from 'immutability-helper';

export default {
  namespace: 'forms',
  state: {
    crudPool: crudPoolState
  },
  reducers: {
    'open'(state,{payload}){
      return update(state,{[payload.form]:{visible:{$set:true}}});
    },
    'close'(state,{payload}){
      return update(state,{[payload.form]:{visible:{$set:false}}});
    },
  },
  effects:{
  },
  subscriptions:{
  }
};
