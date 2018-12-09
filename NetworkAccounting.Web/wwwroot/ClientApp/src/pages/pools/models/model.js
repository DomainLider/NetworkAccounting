import {ListPools} from '../services/poolService'

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
