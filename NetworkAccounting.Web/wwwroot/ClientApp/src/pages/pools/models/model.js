import {ListPools,AddPool,RemovePool} from '../services/poolService'

export default {
  namespace: 'poolList',
  state: {pools:{}},
  reducers: {
    'updatePools'(state,{pools}){
      return {pools};
    },
  },
  effects:{
    *load(payload,{put,call}){
       const response=yield call(ListPools);
       yield put({type:'updatePools',pools:response.data});
    },

    *addPool({payload:{name,description}},{put,call}){
      debugger;
      const response=yield call(AddPool,{name,description});
      if (response.status!==200) return ;//Error in add pool
      yield put({type:'poolList/load'});
    },

    *removePool({payload:{ids}},{put,call}){
      for (const id of ids){
        const response=yield call(RemovePool,id);
        if (response.status!==200) return;//Error in delete pool
      }
      yield put({type:'poolList/load'});
    }

  },
  subscriptions:{
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/pools') {
          dispatch({ type: 'load' });
        }
      });
    },

  }
};
