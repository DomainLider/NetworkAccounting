import {ListNetworks} from '../services/networkService'

export default {
  namespace: 'networkList',
  state: {networks:{}},
  reducers: {
    'updateNetworks'(state,{networks}){
      return {networks};
    },
  },
  effects:{
    *load(payload,{put,call}){
       const response=yield call(ListNetworks);
       yield put({type:'updateNetworks',networks:response.data});
    },
  },
  subscriptions:{
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/networks') {
          dispatch({ type: 'poolList/load' });
          dispatch({ type: 'load' });
        }
      });
    },

  }
};
