import {GetFreeNetwork, LeaseNetwork, ListNetworks} from '../services/networkService'

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

    *lease({payload:{size,poolId,description,fromId}},{put,call}){
      const response=yield call(GetFreeNetwork,{size,poolId,fromId});
      if (response.status!==200) return ; //Error get Free
      const network=response.data;
      if (!!!network) return ;// No free network
      network.description=description;
      const leaseResponse=yield call(LeaseNetwork,network);
      if (leaseResponse.status!==200) return ; //Error in lease

      yield put({type:'forms/setLeasedNetwork',payload:{network:leaseResponse.data}});//update form leased network
      yield put({type:'load'});
    }
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
