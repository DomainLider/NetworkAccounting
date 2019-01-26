import axios from 'axios';

export function ListNetworks () {
  return axios.get('/api/network');
}

export function GetFreeNetwork({size,poolId,fromId}){
  return axios.post(`/api/network/find/`,
    {size,poolId,fromId}
    );
}

export function LeaseNetwork(network){
  return axios.post(`/api/network/lease`,
    {Id:network.id,Description:network.description}
    );
}
