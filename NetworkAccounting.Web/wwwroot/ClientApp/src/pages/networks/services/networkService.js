import axios from 'axios';


export function ListNetworks () {
  return axios.get('/api/network');
}
