import axios from 'axios';

export function ListNetworks () {
  return axios.get('/api/network');
}

export function GetFreeNetwork({size,poolId}){
  return axios.get(`/api/network/find/${size}/${poolId}`);
}

export function LeaseNetwork(network){
  return axios.post(`/api/network/lease`,
    {Id:network.id,Description:network.description}
    );
}
