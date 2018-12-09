import axios from 'axios';


export function ListPools () {
  return axios.get('/api/pool');
}
