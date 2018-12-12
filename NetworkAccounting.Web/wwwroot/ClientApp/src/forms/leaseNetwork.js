import update from 'immutability-helper';

const formName='leaseNetwork';

export const leaseNetworkState = {
  visible:false
};

export function setLeasedNetwork(state,{payload}){
  return update(state,{[formName]:{network:{$set:payload.network}}});
}

export function clearLeasedNetwork(state,{payload}){
  return update(state,{[formName]:{network:{$set:null}}});
}
